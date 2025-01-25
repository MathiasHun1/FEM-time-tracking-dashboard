import { getAllData } from './model.js';

const loadSVG = async (svgPath) => {
  try {
    const response = await fetch(svgPath);

    if (!response.ok) {
      throw new Error(
        `failed to load SVG file: ${response.status} ${response.statusText}`
      );
    }

    const svgText = await response.text();

    const parser = new DOMParser();
    const parsedSvg = parser.parseFromString(svgText, 'image/svg+xml');
    const svgElement = parsedSvg.documentElement;

    return svgElement;
  } catch (error) {
    console.error('Error: ', error.message);
  }
};

const createDomElement = (elementType, className, datasetName) => {
  const element = document.createElement(elementType);
  element.className = className;

  if (datasetName) {
    element.dataset.cardType = datasetName;
  }

  return element;
};

export const createCard = (type, data, timeFrame) => {
  const currentCard = data.find((item) => item.title === type);

  if (!currentCard) {
    throw new Error('This kind of card not exists');
  }
  const curerntData = currentCard.timeframes[timeFrame];

  if (!curerntData) {
    throw new Error('missing or invalid timeFrame!');
  }

  // Create dom elements
  const cardWrapper = createDomElement(
    'div',
    `card__wrapper ${type.replaceAll(' ', '').toLowerCase()}`
  );
  const cardHeader = createDomElement('div', 'card__header', currentCard.title);
  const cardContent = createDomElement('div', 'card-content__wrapper');
  const contentTitleWrapper = createDomElement('div', 'content-title__wrapper');
  const contentTitleText = createDomElement('p', 'content-title__text');
  const contentDataTextWrapper = createDomElement(
    'div',
    'content-data__wrapper'
  );
  const contentPrimaryText = createDomElement('p', 'content-main__text');
  const contentSecondaryText = createDomElement('p', 'content-secondary__text');

  // Arrange the elements
  cardWrapper.appendChild(cardHeader);
  cardWrapper.appendChild(cardContent);

  contentDataTextWrapper.appendChild(contentPrimaryText);
  contentDataTextWrapper.appendChild(contentSecondaryText);

  cardContent.appendChild(contentTitleWrapper);
  cardContent.appendChild(contentDataTextWrapper);

  contentTitleWrapper.appendChild(contentTitleText);

  // Fill in text-contents to elements
  const convertTimeFrameText = () => {
    switch (timeFrame) {
      case 'daily':
        return 'Day';
      case 'weekly':
        return 'Week';
      case 'monthly':
        return 'Month';
      default:
        break;
    }
  };

  contentTitleText.innerText = currentCard.title;
  contentPrimaryText.innerText = `${curerntData.current}hrs`;
  contentSecondaryText.innerText = `Last ${convertTimeFrameText()} - ${
    curerntData.previous
  }hrs`;

  // Return the Card Element
  return cardWrapper;
};

export const loadCardsByTimeframe = (data, timeFrame) => {
  const main = document.querySelector('.main');
  const cardTypes = data.map((card) => card.title);

  cardTypes.map((type) => {
    const card = createCard(type, data, timeFrame);
    main.appendChild(card);
  });
};

export const removeCards = () => {
  const main = document.querySelector('.main');
  const allCards = main.querySelectorAll('.card__wrapper');

  allCards.forEach((card) => {
    main.removeChild(card);
  });
};

export const reloadCardsByTimeframe = async (timeframe) => {
  const data = await getAllData();
  removeCards();
  loadCardsByTimeframe(data, timeframe);
};

export const setButtonActive = (e) => {
  const allButtons = document.querySelectorAll('.timeframe');

  allButtons.forEach((button) => {
    button.classList.remove('active');
  });

  const selectedButton = e.target;
  selectedButton.classList.add('active');
};

console.log('view.js loaded');
