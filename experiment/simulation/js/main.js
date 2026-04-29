// --- Problems (example, adapt as needed) ---
const problems = [
  {
    id: 1,
    title: "Problem 1",
    desc: "Given a positive integer, find the sum of all its divisors (including itself).",
    template: [
      "int main() {",
      "    int n;",
      '    scanf(\"%d\", &n);',
      "    int sum = _____;", // blank 0
      "    for (int i = 1; i <= n; i++) {",
      "        if (n % i == 0)",
      "            sum _____ i;", // blank 1
      "    }",
      '    printf("%d\\n", sum);',
      "    return 0;",
      "}",
    ],
    blanks: [
      { line: 3, answers: ["0"], placeholder: "initial value" },
      { line: 6, answers: ["+=", "+= "], placeholder: "operator" },
    ],
    hints: [
      "What should sum be initialized to?",
      "Which operator adds i to sum?",
      "For n=6, output is 12. For n=10, output is 18.",
    ],
    compilerOutput: "Compiled successfully.",
    runtimeOutput: "For n=6, output is 12. For n=10, output is 18.",
  },
  {
    id: 2,
    title: "Problem 2",
    desc: "Given a positive integer, print all its prime factors in increasing order.",
    template: [
      "int main() {",
      "    int n;",
      '    scanf(\"%d\", &n);',
      "    for (int i = 2; i <= n; i++) {",
      "        while (n % i == 0) {",
      '            printf("%d ", i);',
      "            n _____ i;", // blank 0
      "        }",
      "    }",
      "    return 0;",
      "}",
    ],
    blanks: [{ line: 6, answers: ["/=", "/= "], placeholder: "operator" }],
    hints: [
      "Which operator divides n by i?",
      "For n=18, output is 2 3 3. For n=60, output is 2 2 3 5.",
    ],
    compilerOutput: "Compiled successfully.",
    runtimeOutput: "For n=18, output is 2 3 3. For n=60, output is 2 2 3 5.",
  },
  {
    id: 3,
    title: "Problem 3",
    desc: "Given a positive integer, check if it is a palindrome (reads the same forwards and backwards). Print YES or NO.",
    template: [
      "int main() {",
      "    int n, rev = 0, orig;",
      '    scanf(\"%d\", &n);',
      "    orig = n;",
      "    while (n > 0) {",
      "        rev = rev * 10 + n % _____;", // blank 0
      "        n /= _____;", // blank 1
      "    }",
      "    if (rev == orig)",
      '        printf(\"YES\\n\");',
      "    else",
      '        printf(\"NO\\n\");',
      "    return 0;",
      "}",
    ],
    blanks: [
      { line: 5, answers: ["10"], placeholder: "modulus base" },
      { line: 6, answers: ["10"], placeholder: "divisor" },
    ],
    hints: [
      "What value do you use to get the last digit?",
      "What value do you use to remove the last digit?",
      "For n=121, output is YES. For n=123, output is NO.",
    ],
    compilerOutput: "Compiled successfully.",
    runtimeOutput: "For n=121, output is YES. For n=123, output is NO.",
  },
];

let currentProblem = null;
let userInputs = [];

function renderProblemOptions() {
  const select = document.getElementById("problem-select");
  select.innerHTML = problems
    .map((p, i) => `<option value="${i}">Problem ${i + 1}</option>`)
    .join("");
}

function renderProblem(idx) {
  currentProblem = problems[idx];
  userInputs = Array(currentProblem.blanks.length).fill("");
  document.getElementById("problem-desc").textContent = currentProblem.desc;
  renderCodeTemplate();
  renderHints();
  document.getElementById("feedback").textContent = "";
  document.getElementById("runtime-output").textContent = "";
  document.getElementById("run-btn").disabled = true;
}

function renderCodeTemplate() {
  const codeDiv = document.getElementById("code-template");
  codeDiv.innerHTML = "";
  currentProblem.template.forEach((line, idx) => {
    let html = line;
    currentProblem.blanks.forEach((blank, bIdx) => {
      if (blank.line === idx) {
        html = html.replace(
          "_____",
          `<input class="blank-input" data-blank="${bIdx}" value="${userInputs[bIdx] || ""}" placeholder="${blank.placeholder}" />`,
        );
      }
    });
    codeDiv.innerHTML += `<div class="template-line">${html}</div>`;
  });
  // Attach input listeners
  codeDiv.querySelectorAll(".blank-input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const bIdx = +e.target.getAttribute("data-blank");
      userInputs[bIdx] = e.target.value;
      document.getElementById("feedback").textContent = "";
      document.getElementById("runtime-output").textContent = "";
      document.getElementById("run-btn").disabled = true;
    });
  });
}

function renderHints() {
  const hintSelect = document.getElementById("hint-level");
  hintSelect.innerHTML = "";
  hintSelect.innerHTML += `<option value="0" disabled selected>Hint 0</option>`;
  for (let i = 1; i <= currentProblem.hints.length; ++i) {
    hintSelect.innerHTML += `<option value="${i}">Hint ${i}</option>`;
  }
  showHints(0);
  hintSelect.onchange = (e) => showHints(+e.target.value);
}

function showHints(level) {
  const hintsDiv = document.getElementById("hints");
  if (level === 0) {
    hintsDiv.innerHTML = "";
    return;
  }
  hintsDiv.innerHTML = `<div class="hint">${currentProblem.hints[level - 1]}</div>`;
}

function checkAnswers() {
  let allCorrect = true;
  let feedback = "";
  currentProblem.blanks.forEach((blank, i) => {
    const userVal = (userInputs[i] || "").trim();
    if (blank.answers.map((a) => a.trim()).includes(userVal)) {
      feedback += `<div class="feedback-correct">Blank ${i + 1}: Correct</div>`;
    } else {
      feedback += `<div class="feedback-incorrect">Blank ${i + 1}: Incorrect</div>`;
      allCorrect = false;
    }
  });
  document.getElementById("feedback").innerHTML = feedback;
  document.getElementById("run-btn").disabled = !allCorrect;
}

function showRuntimeOutput() {
  document.getElementById("runtime-output").innerHTML =
    `<div class="feedback-all-correct">${currentProblem.runtimeOutput}</div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderProblemOptions();
  renderProblem(0);
  document.getElementById("problem-select").onchange = (e) =>
    renderProblem(+e.target.value);
  document.getElementById("submit-btn").onclick = checkAnswers;
  document.getElementById("run-btn").onclick = showRuntimeOutput;
});
