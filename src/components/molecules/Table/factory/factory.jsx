import { format } from 'date-fns';
import Toggle from '../../../atoms/forms/toggle/Toggle';
import styles from './Component.module.scss';
import { svgMap } from '../../../../helpers/render-icon/svgMap';
import Tooltip from '../../../Custom/tooltip/Tooltip';

export const formatDateTime = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, 'MM/dd/yyyy hh:mm a');
  } catch (e) {
    return '';
  }
};

const dataLinks = [
  {
    svgType: 'devops',
  },
  {
    svgType: 'gitHub',
  },
  {
    svgType: 'figmaFile',
  },
  {
    svgType: 'figma',
  },
];
export const renderTableData = ({ item, header, handleSwitch, rowKey }) => {
  if (header.hasMobile) {
    return item[header.fieldName];
  } else if (header.isDatetime) {
    return formatDateTime(item[header.fieldName]);
  }  else if (header.isVersion) {
    return (
      <div className={styles.version}>
        <img src={svgMap['globe']} slt="globe" />
        <p>{item[header.fieldName]}</p>
      </div>
    );
  } else if (header.isBranch) {
    return (
      <div className={styles.branch}>
        <img src={svgMap['branch']} slt="globe" />
        <p>{item[header.fieldName]}</p>
      </div>
    );
  } else if (header.isLink) {
    return (
      <div className={styles.dataLinks}>
        {dataLinks?.map((item) => (
          <Tooltip content={item.svgType} key={item.svgType}>
            <img
              src={svgMap[item.svgType]}
              onClick={(e) => (
                e.stopPropagation(),
                window.open(
                  'https://www.figma.com/design/vFQRUWBpQhw1dY610ZUG4h/CTS-Version-control?node-id=5052-17141&m=dev',
                  '_blank',
                  'rel=noopener noreferrer'
                )
              )}
            />
          </Tooltip>
        ))}
      </div>
    );
  } else if (header.isSwitch) {
    return (
      <div onClick={(e) => e.stopPropagation()}>
        <Toggle
          value={item[header.fieldName]}
          onChange={(e) => handleSwitch(item[rowKey], item[header.fieldName])}
          disabled={
            header.fieldName === 'status' && item['isSystem'] === true
              ? true
              : false
          }
        />
      </div>
    );
  } else {
    return item[header.fieldName];
  }
};
