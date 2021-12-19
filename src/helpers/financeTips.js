import { getTips } from '../api/data/tipData';

const housingTip = (housingTotal, incTotal) => {
  console.warn('incTotal', incTotal);
  console.warn('housingTotal', housingTotal);
  if (housingTotal / incTotal > 0.3) {
    getTips().then((tipArray) => {
      const houseTip = tipArray.filter((data) => data.category === 'Housing');
      console.warn('If Statement', houseTip);
      // setHousingTips(houseTip);
    });
  } else {
    getTips().then((tipArray) => {
      const tip = tipArray.filter((data) => data.category === 'none');
      console.warn('Else Statement', tip);
      // setHousingTips(tip);
    });
  }
};

export default housingTip;
