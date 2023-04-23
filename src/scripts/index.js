const [calculator] = document.forms;
const [weightInput, repsInput, formulaInput, output] = calculator.elements;
const formulas = {
  "Adams"   : (w, r) => w / (1 - 0.02 * r),
  "Baechle" : (w, r) => w * (1 + 0.033 * r),
  "Berger"  : (w, r) => w / (1.0261 * Math.exp(-0.0262 * r)),
  "Brown"   : (w, r) => w * (0.9849 + 0.0328 * r),
  "Brzycki" : (w, r) => w / (1.0278 - 0.0278 * r),
  "Epley"   : (w, r) => w * (1 + r / 30),
  "Kemmler" : (w, r) => w * (0.988 + 0.0104 * r + 0.00190 * r ** 2 - 0.0000584 * r ** 3),
  "Landers" : (w, r) => w / (1.013 - 0.0267123 * r),
  "Lombardi": (w, r) => w * r ** 0.1,
  "Mayhew"  : (w, r) => w / (0.522 + 0.419 * Math.exp(-0.055 * r)),
  "O'Conner": (w, r) => w * (1 + 0.025 * r),
  "Wathen"  : (w, r) => w / (0.488 + 0.538 * Math.exp(-0.075 * r)),
};

for (const formulaKey in formulas) {
  const option = document.createElement('option');
  option.append(formulaKey);
  formulaInput.append(option);
}

formulaInput.lastElementChild.setAttribute('selected', '');

calculator.addEventListener('input', () => {
  const weight = Number.parseFloat(weightInput.value);
  const reps = Number.parseFloat(repsInput.value);
  const formula = formulas[formulaInput.value];
  const estimated1RM = formula(weight, reps);
  if (Number.isFinite(estimated1RM)) output.value = estimated1RM.toFixed();
});
