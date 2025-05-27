import moment from 'moment';

export function cleanToken(token) {
  return token.replace(/(^"|"$)/g, '');
}

export function generateUUID() {
  var d = new Date().getTime();
  var d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export const getToolbarConfig = ({ title, setShow, show }) => {
  const currentDate = moment().format('YYYY-MM-DD');
  const filename = `${title}_${currentDate}`;
  console.log('vvvvvvvvvvvvvvvvvvv', show);
  return {
    show: true,
    tools: {
      zoom: false,
      zoomin: false,
      zoomout: false,
      pan: false,
      reset: false,
      download: `<img src="/images/download-ico.svg" />`,
      customIcons: show
        ? []
        : [
            {
              icon: `<img src="/images/full-screen-ico.svg" height="14" width="14" class="ps-2 expand-icon" />`,
              index: 0,
              click: () => setShow((prev) => !prev),
              title: 'Zoom In',
            },
          ],
    },
    export: {
      csv: {
        filename,
      },
      svg: {
        filename,
      },
      png: {
        filename,
      },
    },
  };
};
