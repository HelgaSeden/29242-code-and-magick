'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var SHADOW_GAP = 10;
var FONT_GAP = 30;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var TEXT_COLOR = 'rgb(0, 0, 0)';
var barHeight = CLOUD_HEIGHT - GAP * 2 - FONT_GAP * 3;

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return Math.round(maxElement);
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, x, y, color, text) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255, 255, 255)');

  ctx.textBaseline = 'hanging';
  ctx.font = '16px PT Mono';

  renderText(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, TEXT_COLOR, 'Ура вы победили!');
  renderText(ctx, CLOUD_X + GAP, CLOUD_Y + GAP * 2, TEXT_COLOR, 'Список результатов:');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    renderText(ctx, CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
                    CLOUD_Y + (CLOUD_HEIGHT - FONT_GAP),
                    TEXT_COLOR, names[i]);
    renderText(ctx, CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
                    CLOUD_Y + (CLOUD_HEIGHT - GAP * 3) - barHeight * times[i] / maxTime,
                    TEXT_COLOR, Math.round(times[i]));
    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random() + ')';
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
      CLOUD_Y + (CLOUD_HEIGHT - GAP * 2), BAR_WIDTH, -barHeight * times[i] / maxTime);
  }
};
