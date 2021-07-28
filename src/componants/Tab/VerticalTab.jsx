import './VerticalTab.css';
const VerticalTab = (props) => {
  const createTabList = (items) => {
    return items.map((item, index) => {
      return (
        <div
          key={index}
          className={
            parseInt(props.activeTab) === item.id ? "tabitem" : "tabitem tabitem--inactive"
          }
          data-id={item.id}
          data-name={item.component}
          onClick={props.onClickFun}
        >
          <i className={item.icon}></i>
          <p className="tabitem__title" data-id={item.id}
          data-name={item.component} >{item.title}</p>
        </div>
      );
    });
  };

  return props.tabList.map((group, index) => {
    return (
      <div key={index} className="left-panel-block">
        <h2 className="m-0">{group.title}</h2>
        <div className="tabs-listing flex-column">
          {createTabList(group.items)}
        </div>
      </div>
    );
  });
};

export default VerticalTab;