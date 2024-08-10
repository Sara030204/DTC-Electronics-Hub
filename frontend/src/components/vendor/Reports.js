import Sidebar from './sidebar';
import "./sb-admin-2.css";

function Reports() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-12 p-0">
                    <Sidebar />
                </div>
                <div className="col-md-9 col-12 p-0">
                    <div className="row mt-5">
                    <div className="col-xl-4 col-md-6 mb-4 ms-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                               <h6>Daily reports</h6> 
                                            </div>
                                                <h4 className='btn btn-info btn-sm'>View Report</h4>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fa fa-users fa-2x text-gray-300"></i>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Monthly reports
                                            </div>
                                            <h4 className='btn btn-info btn-sm'>View Report</h4>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fa fa-users fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6 mb-4 ms-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Reports
                                            </div>
                                            <h4 className='btn btn-info btn-sm'>View Report</h4>

                                        </div>
                                        <div className="col-auto">
                                            <i className="fa fa-users fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;
