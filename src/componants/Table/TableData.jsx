import {useEffect,useState} from 'react';
import ToolkitProvider, { /* CSVExport, */ Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Loader from '../Loader/Loader';
import './TableData.css';
import { apiRequest} from '../../Helpers/General';

const TableData = (props) => {
  const recPerPage = props.recPerPage || 10;
  const title = props.title;
  const rowClasses = props.rowClasses;
  const keyField = props.keyField;
  const [data, setData] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [doRefresh, setDoRefresh] = useState(0);
  const [notFoundMsg, setNotFoundMsg] = useState("");
  const colModal = props.colModal || [];
  const { SearchBar } = Search;
  //const { ExportCSVButton } = CSVExport; //to add delete button in list
  const defaultSorted = props.defaultSorted;
  const noRecordFound = () => (
    <h2>{notFoundMsg !== "" ? notFoundMsg : "No Record Found!"}</h2>
  );
  const CaptionElement = () => (<h2>{title}</h2>);
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total label label-warning">
      Showing { from } to { to } of { size } Results.
    </span>
  );
  const pageSetting = {
    className: "custom-pagination",
    sizePerPage : recPerPage,
    paginationSize: 5,
    pageStartIndex: 1,
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true
  };
  useEffect(() => {
    const getApiData = async () => {
      try {
        const apiSetting = {apiParams :props.apiSetting.apiParams};
        const apiResult = await apiRequest(props.apiSetting.apiFun,apiSetting);
        if(apiResult.data.settings.success === "1")
        {
          setData(apiResult.data.data);
        }
        else
        {
          throw new Error("No Record Found!.");
        }
      } catch (error) {
        setData([]);
        setNotFoundMsg("No Record Found!.");
      }finally{
        setIsPageLoading(false);
      }
    };
    if(props.apiSetting)
    {
      getApiData();
    }
    else
    {
      setData(props.data);
      setIsPageLoading(false);      
    }
    
  },[props,doRefresh]);
  if(colModal.length === 0)
  {
    return <div className="page-wrapper">
            <center className="text-danger">Please check table configuration.</center>
            </div>
  }
  else if(isPageLoading)
  {
    return <Loader/>;
  }
  else
  {
    return  <div className="page-wrapper">
      <ToolkitProvider
        bootstrap4
        keyField={keyField}
        data={ data }
        columns={ colModal }
        exportCSV={ { onlyExportFiltered: true, exportAll: false } }
        search
        caption={CaptionElement}
      >
        {
          props => (
            
            <div>
              <div className="tableTopBlock">
                <div className="actionBtn">
                  <button className="btn-refresh" onClick={(e) => {setDoRefresh(doRefresh + 1);setIsPageLoading(true)}}><i className="mdi mdi-refresh"></i></button>
                  {/* <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton> */}
                  </div>
                  <div className="">
                    <SearchBar { ...props.searchProps } />
                  </div>
              </div>

              <BootstrapTable
                { ...props.baseProps }
                pagination={ paginationFactory(pageSetting) }
                filter={ filterFactory() }
                defaultSorted={ defaultSorted }
                noDataIndication = {noRecordFound}
                rowClasses = {rowClasses}
              />
            </div>
          )
        }
      </ToolkitProvider>
    </div>
  }
}

export default TableData;