'use strict';

var userDialog = document.querySelector('.setup');

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var PLAYERS = 4;

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var LAST_NAMES = [
  'де Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_COLOR = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
]

var randomIndex = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getRandomElement = function (arr) {
  return arr[randomIndex(0, arr.length - 1)];
};

var getName = function () {
  var name = getRandomElement([NAMES, LAST_NAMES][randomIndex(0, 1)]);
  return NAMES.includes(name) ? name + ' ' + getRandomElement(LAST_NAMES) : name + ' ' + getRandomElement(NAMES);
};

var generateArray = function (genElem) {
  var result = [];
  while (result.length < PLAYERS) {
    var elem = genElem();
    if (!result.includes(elem)) {
      result = result.concat(elem);
    }
  }
  return result;
};

var generateWizards = function () {
  var wizardNames = generateArray(getName);
  var coats = generateArray(function () { return getRandomElement(COAT_COLOR) });
  var eyes = generateArray(function () { return getRandomElement(EYES_COLOR) });
  var result = [];
  for (var i = 0; i < PLAYERS; i++) {
    result = result.concat({name: wizardNames[i],
                            coatColor: coats[i],
                            eyesColor: eyes[i]});
  }
  return result;
};

var wizards = generateWizards();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var closePopup = function () {
  setup.classList.add('hidden');
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  });
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var playerWizard = document.querySelector('.setup-wizard');

playerWizard.querySelector('.wizard-coat').addEventListener('click', function () {
  playerWizard.querySelector('.wizard-coat').style.fill = getRandomElement(COAT_COLOR);
});

playerWizard.querySelector('.wizard-eyes').addEventListener('click', function () {
  playerWizard.querySelector('.wizard-eyes').style.fill = getRandomElement(EYES_COLOR);
});

document.querySelector('.setup-fireball-wrap').addEventListener('click', function () {
  document.querySelector('.setup-fireball-wrap').style.background = getRandomElement(FIREBALL_COLOR);
});
