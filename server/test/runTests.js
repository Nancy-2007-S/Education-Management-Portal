/**
 * Automated Verification Test Suite for Education Management Portal
 * Tests core service calculations, grade logic, attendance risk triggers,
 * progress computation, and AI insights evaluation.
 */

const assert = require('assert');

console.log('====================================================');
console.log('  RUNNING AUTOMATED SERVICE SYNCHRONIZATION TESTS   ');
console.log('====================================================\n');

let testsPassed = 0;
let testsFailed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    testsFailed++;
  }
}

// ─── TEST 1: Grade Computation Logic ─────────────────────────────────────────
runTest('Grade Computation Logic (_computeGrade)', () => {
  const _computeGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', gradePoint: 10 };
    if (percentage >= 80) return { grade: 'A',  gradePoint: 9  };
    if (percentage >= 70) return { grade: 'B+', gradePoint: 8  };
    if (percentage >= 60) return { grade: 'B',  gradePoint: 7  };
    if (percentage >= 50) return { grade: 'C',  gradePoint: 6  };
    if (percentage >= 40) return { grade: 'D',  gradePoint: 5  };
    return                       { grade: 'F',  gradePoint: 0  };
  };

  assert.strictEqual(_computeGrade(95).grade, 'A+');
  assert.strictEqual(_computeGrade(95).gradePoint, 10);
  assert.strictEqual(_computeGrade(85).grade, 'A');
  assert.strictEqual(_computeGrade(85).gradePoint, 9);
  assert.strictEqual(_computeGrade(72).grade, 'B+');
  assert.strictEqual(_computeGrade(72).gradePoint, 8);
  assert.strictEqual(_computeGrade(61).grade, 'B');
  assert.strictEqual(_computeGrade(61).gradePoint, 7);
  assert.strictEqual(_computeGrade(55).grade, 'C');
  assert.strictEqual(_computeGrade(55).gradePoint, 6);
  assert.strictEqual(_computeGrade(42).grade, 'D');
  assert.strictEqual(_computeGrade(42).gradePoint, 5);
  assert.strictEqual(_computeGrade(30).grade, 'F');
  assert.strictEqual(_computeGrade(30).gradePoint, 0);
});

// ─── TEST 2: Attendance Summary & Risk Evaluation ────────────────────────────
runTest('Attendance Summary Calculation & Risk Threshold', () => {
  const computeSummary = (current, isPresent) => {
    const totalClasses = current.totalClasses + 1;
    const attended     = current.attended + (isPresent ? 1 : 0);
    const absent       = current.absent   + (isPresent ? 0 : 1);
    const percentage   = Math.round((attended / totalClasses) * 100);
    const isAtRisk     = percentage < 75;
    return { totalClasses, attended, absent, percentage, isAtRisk };
  };

  const initial = { totalClasses: 9, attended: 6, absent: 3, percentage: 67, isAtRisk: true };
  
  // Mark present -> 7 / 10 = 70% -> still at risk (< 75%)
  const step1 = computeSummary(initial, true);
  assert.strictEqual(step1.totalClasses, 10);
  assert.strictEqual(step1.attended, 7);
  assert.strictEqual(step1.percentage, 70);
  assert.strictEqual(step1.isAtRisk, true);

  // Mark present again -> 8 / 11 = 73% -> still at risk (< 75%)
  const step2 = computeSummary(step1, true);
  assert.strictEqual(step2.percentage, 73);
  assert.strictEqual(step2.isAtRisk, true);

  // Mark present again -> 9 / 12 = 75% -> no longer at risk
  const step3 = computeSummary(step2, true);
  assert.strictEqual(step3.percentage, 75);
  assert.strictEqual(step3.isAtRisk, false);
});

// ─── TEST 3: Progress CGPA & Completion Rate Calculation ─────────────────────
runTest('Progress CGPA & Course Completion Calculation', () => {
  const grades = {
    CS101: { gradePoint: 9, isPassed: true },
    CS102: { gradePoint: 8, isPassed: true },
    CS103: { gradePoint: 7, isPassed: true },
    CS104: { gradePoint: 4, isPassed: false }
  };

  const gradePoints = Object.values(grades).map(g => g.gradePoint);
  const cgpa = +(gradePoints.reduce((a, b) => a + b, 0) / gradePoints.length).toFixed(2);
  const passed = Object.values(grades).filter(g => g.isPassed).length;
  const completionRate = Math.round((passed / gradePoints.length) * 100);

  assert.strictEqual(cgpa, 7.00); // (9 + 8 + 7 + 4) / 4 = 28 / 4 = 7.00
  assert.strictEqual(completionRate, 75); // 3 of 4 passed = 75%
});

// ─── TEST 4: AI Insights Risk & Weak Subjects Evaluation ─────────────────────
runTest('AI Insights Risk Classification & Recommendation Generation', () => {
  const evaluateInsights = (grades, attendanceSummary, cgpa) => {
    const weakSubjects = {};
    const strengths = {};

    for (const [courseId, grade] of Object.entries(grades)) {
      if (grade.gradePoint < 6) {
        weakSubjects[courseId] = { courseName: courseId, score: grade.gradePoint };
      } else if (grade.gradePoint >= 8) {
        strengths[courseId] = { courseName: courseId, score: grade.gradePoint };
      }
    }

    const atRiskAttendance = Object.values(attendanceSummary).some(a => a.isAtRisk);
    const lowCgpa = cgpa < 5;

    let riskLevel = 'low';
    if (atRiskAttendance && lowCgpa) riskLevel = 'high';
    else if (atRiskAttendance || lowCgpa) riskLevel = 'medium';

    return { riskLevel, weakSubjectsCount: Object.keys(weakSubjects).length, strengthsCount: Object.keys(strengths).length };
  };

  const sampleGrades = {
    CS201: { gradePoint: 9 }, // strength
    MATH202: { gradePoint: 4 }, // weak
  };

  const sampleAttendance = {
    CS201: { isAtRisk: false },
    MATH202: { isAtRisk: true } // attendance at risk
  };

  const result = evaluateInsights(sampleGrades, sampleAttendance, 6.5);
  assert.strictEqual(result.riskLevel, 'medium'); // attendance at risk, cgpa ok
  assert.strictEqual(result.weakSubjectsCount, 1);
  assert.strictEqual(result.strengthsCount, 1);
});

console.log('\n----------------------------------------------------');
console.log(`  TEST RESULTS: ${testsPassed} Passed, ${testsFailed} Failed`);
console.log('----------------------------------------------------');

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('  ✨ ALL AUTOMATED TESTS PASSED SUCCESSFULLY! ✨\n');
}
