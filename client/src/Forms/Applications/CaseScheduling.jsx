import React, { Component } from "react";
import swal from "sweetalert";
import Select from "react-select";
import Table from "../../Table";
import TableWrapper from "../../TableWrapper";
import { Link } from "react-router-dom";
import Modal from 'react-awesome-modal';
import Popup from "reactjs-popup";
import popup from "./../../Styles/popup.css";
import { ToastContainer, toast } from "react-toastify";
var dateFormat = require('dateformat');
var jsPDF = require("jspdf");
require("jspdf-autotable");
var _ = require("lodash");
class CaseScheduling extends Component {
    constructor() {
        super();
        this.state = {
            Branches: [],
            casedetails: [],
            privilages: [],
            ToDate:"",
            FromDate:"",
            ApplicantDetails: [],
            ApplicationNo: "",
            PEDetails: [],
            summary: false,
            Unbooking:false,
            DaysArray:[],
            FilePath:"",
            Today: dateFormat(new Date().toLocaleDateString(), "isoDate"),
            casedetailstatus: "",
            Bookings:[],
            VenueID:"",
            RoomName:"",
            Branch:"",
            ToolTipText:"",
            FilteredBookings:[],
            Venues:[],
            btncolor: "#e5e6e7",           
            selectedRoom:"#1ab394",
            open: false,
            SelectedDate:"",
            FromTime:"" ,  
            TOTime:"",   
            VenueDesc:"" ,
            FilingDate:"",
            PEServedOn: ""    ,
            showNoticvebtn:false       
        };
        this.ScheduleCase = this.ScheduleCase.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.fetchcasedetails = this.fetchcasedetails.bind(this)
        this.CheckRoomAvailability = this.CheckRoomAvailability.bind(this)
        this.fetchBranches = this.fetchBranches.bind(this)
       // this.fetchBookings = this.fetchBookings.bind(this)
        this.getDates = this.getDates.bind(this)
        this.HoverBtn = this.HoverBtn.bind(this)
        this.GenerateNotification = this.GenerateNotification.bind(this)
        this.UnBookRoom = this.UnBookRoom .bind(this)
        this.fetchVenuesPerBranch = this.fetchVenuesPerBranch.bind(this)
        this.checkIfBooked = this.checkIfBooked.bind(this)
        
    }
    openModal=()=>{
        this.setState({ open: true });
       
    }
    closeModal=()=> {
        this.setState({ Unbooking: false, open: false});
    }
    fetchBookings = () => {
        this.setState({ Bookings: [] });
        fetch("/api/CaseScheduling/All/AllBookings", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(Bookings => {
                if (Bookings.length > 0) {
                    this.setState({ Bookings: Bookings });
                } else {
                    swal("", Bookings.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchBranches = () => {
        fetch("/api/Branches", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(Branches => {
                if (Branches.length > 0) {
                    this.setState({ Branches: Branches });
                } else {
                    swal("", Branches.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    getDates = (startDate, endDate)=> {
        var dates = [],
            currentDate = startDate,
            addDays = function (days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        while (currentDate <= endDate) {
        let newday=    dateFormat(new Date(currentDate).toLocaleDateString(), "isoDate");
            let data={
                Date: newday
            }
            dates.push(data);
            currentDate = addDays.call(currentDate, 1);
        }  
      
      
        this.setState({ DaysArray: dates})
       
        
   
    }   
    fetchUsers = () => {
        fetch("/api/caseofficers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(Users => {
                if (Users.length > 0) {

                    this.setState({ Users: Users });
                } else {
                    swal("", Users.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchPEDetails = (ApplicationNo) => {
        this.setState({ PEDetails: [] });
        fetch("/api/PE/" + ApplicationNo + "/ApplicantDetails", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(PEDetails => {
                if (PEDetails.length > 0) {

                    this.setState({ PEDetails: PEDetails });
                } else {
                    swal("", PEDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchApplicantDetails = (ApplicationNo) => {
        this.setState({ ApplicantDetails: [] });
        fetch("/api/Panels/" + ApplicationNo + "/ApplicantDetails", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ApplicantDetails => {
                if (ApplicantDetails.length > 0) {

                    this.setState({ ApplicantDetails: ApplicantDetails });
                } else {
                    swal("", ApplicantDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    handleSelectChange = (UserGroup, actionMeta) => {
        
        if (actionMeta.name==="Branch"){
           
           
            this.fetchVenuesPerBranch(UserGroup.value, UserGroup.label);         
        }
        if (actionMeta.name=== "VenueID") {
            this.setState({ VenueID: UserGroup.value });
            this.setState({ RoomName: UserGroup.label });
            
          
        }
        this.setState({ [actionMeta.name]: UserGroup.value });     
        };
    handleInputChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };
    SendSMS(MobileNumber, Msg) {
        let data = {
            MobileNumber: MobileNumber,
            Message: Msg
        };
        return fetch("/api/sendsms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response =>
                response.json().then(data => {
                    if (data.success) {
                    } else {
                        swal("", data.message, "error");
                    }
                })
            )
            .catch(err => {
                swal("", err.message, "error");
            });
    }
    SendMail = (Name, email, ID, subject, ApplicationNo) => {
        let filepath = process.env.REACT_APP_BASE_URL + "/HearingNotices/" + this.state.ApplicationNo + ".pdf";
        let fileName = this.state.ApplicationNo + ".pdf";
        const emaildata = {
            to: email,
            subject: subject,
            ID: ID,
            Name: Name,
            ApplicationNo: ApplicationNo,
            AttachmentName: fileName,
            Attachmentpath: filepath
        };

        fetch("/api/NotifyApprover", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            },
            body: JSON.stringify(emaildata)
        })
            .then(response => response.json().then(data => { }))
            .catch(err => {
                //swal("Oops!", err.message, "error");
            });
    };     
    checkIfBooked = (Time, day)=>{
    
        var rows = [...this.state.Bookings];
        const filtereddata = rows.filter(
            item => item.VenueID == this.state.VenueID
        );        
        const filtereddata1 = filtereddata.filter(
            item => item.Date === day
        );  
        const filtereddata2 = filtereddata1.filter(
            item => item.Slot == Time
        );   
       // console.log(filtereddata2)
        if (filtereddata2.length>0){
            return true;
        }
        else{
            return false;
        }
    }
    CheckRoomAvailability = (event) => {
        event.preventDefault();
        let date1 = dateFormat(new Date(this.state.FromDate).toLocaleDateString(), "isoDate")
        let date2 = dateFormat(new Date(new Date()).toLocaleDateString(), "isoDate")
        let date3 = dateFormat(new Date(this.state.ToDate).toLocaleDateString(), "isoDate")
       // if (new Date(this.state.FromDate) < new Date()) {
        if (date1 < date2){
         swal("","Minimum Date allowed is Today!","error")
        }else{
            if (date3 < date2){
                swal("", "Minimum Date allowed is Today!", "error")
            }else{
                this.getDates(new Date(this.state.FromDate), new Date(this.state.ToDate))
                // this.fetchVenuesPerBranch()
            }          
        }        

    }
 
    fetchVenuesPerBranch = (Branch, VenueDesc) => {    
        
        this.setState({ Venues: [] });
        fetch("/api/CaseScheduling/" + Branch+"/Venues", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
             })
            .then(res => res.json())
            .then(Venues => {
                if (Venues.length > 0) {
                    this.setState({ Venues: Venues });
                    this.setState({ Branch: Branch });
                    this.setState({ VenueDesc: VenueDesc });   
                   
                } else {
                    swal("", Venues.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchcasedetails = () => {
        this.setState({ casedetails: [] });
        fetch("/api/CaseScheduling", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(casedetails => {
                if (casedetails.length > 0) {
                    this.setState({ casedetails: casedetails });
                } else {
                   toast.error(casedetails.message);
                }
            })
            .catch(err => {
                toast.error(err.message);
            });
    };
    UpdateSentMails = () => {
        fetch("/api/CaseScheduling/" + this.state.ApplicationNo + "/UpdateSentNotice", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(List => {
            
            })
            .catch(err => {
                //swal("", err.message, "error");
            });
    };
    sendAttachment=()=>{
        fetch("/api/CaseScheduling/"+this.state.ApplicationNo+"/ContactList", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(List => {
                if (List.length > 0) {
                    let NewList = [List]   
                    NewList[0].map((item, key) =>
                        this.SendMail(item.Name, item.Email,"Send Hearing Notice","CASE HEARING NOTICE",this.state.ApplicationNo)
                    ) 
                    this.UpdateSentMails();
                    swal("", "Notice has been sent to PE,Applicant and all the panel members", "success");
                } else {
                    swal("", "Error getting contact list", "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    Downloadfile=()=>{   
        let filepath = process.env.REACT_APP_BASE_URL + "/HearingNotices/" + this.state.ApplicationNo + ".pdf" ;
        window.open(filepath);    
}
    componentDidMount() {
        let token = localStorage.getItem("token");
        if (token == null) {
            
            localStorage.clear();
            return (window.location = "/#/Logout");
        } else {
            fetch("/api/ValidateTokenExpiry", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token")
                }
            })
                .then(response =>
                    response.json().then(data => {
                        if (data.success) {
                            this.fetchUsers();
                            this.fetchcasedetails();
                            this.fetchBranches();
                            this.fetchBookings();
                        } else {
                            localStorage.clear();
                            return (window.location = "/#/Logout");
                        }
                    })
                )
                .catch(err => {
                    localStorage.clear();
                    return (window.location = "/#/Logout");
                });
        }
        
    }

    HoverBtn=(Time, day)=>{
        this.setState({ ToolTipText: "" });
    var rows = [...this.state.Bookings];
    const filtereddata = rows.filter(
        item => item.VenueID == this.state.VenueID
    );
    
    const filtereddata1 = filtereddata.filter(
        item => item.Date === day
    );
    const filtereddata2 = filtereddata1.filter(
        item => item.Slot == Time
    );   
      
        if (filtereddata2.length>0){
            this.setState({ ToolTipText: filtereddata2[0].Content });
        }
    }

    BookRoom = (Time, day) => {      
        this.setState({ SelectedDate: day });
        this.setState({ FromTime: Time });     
        let time1array=Time.split(".");        
        let newtime = (+time1array[0] + +1)     
        if (Time =="12.00PM"){      
           
            this.setState({ TOTime: "1.00PM" });   
        }else if(Time =="11.00AM"){
            //let newtime1=newtime+"."+time1array[1]
            this.setState({ TOTime: "12.00PM" });   
        } else if (Time == "5.00PM") {
            //let newtime1 = newtime + "." + time1array[1]
            this.setState({ TOTime: "5.00PM" });
        } else {
            let newtime1 = newtime + "." + time1array[1]
            this.setState({ TOTime: newtime1 });
        }
      
        this.setState({ open: true });
    }
    UnBookRoom = (Time, day) => {
    
        this.setState({ SelectedDate: day });
        this.setState({ Unbooking: true });
        this.setState({ FromTime: Time });
        let time1array = Time.split(".");
        let newtime = (+time1array[0] + +1)

        if (Time == "12.00PM") {

            this.setState({ TOTime: "1.00PM" });
        } else if (Time == "11.00AM") {
            //let newtime1=newtime+"."+time1array[1]
            this.setState({ TOTime: "12.00PM" });
        } else if (Time == "5.00PM") {
            //let newtime1 = newtime + "." + time1array[1]
            this.setState({ TOTime: "5.00PM" });
        } else {
            let newtime1 = newtime + "." + time1array[1]
            this.setState({ TOTime: newtime1 });
        }

        this.setState({ open: true });
    }
    switchMenu = e => {
        this.setState({ summary: false });
    }
    ScheduleCase = k => {
      
        const data = {
            ApplicationNo: k.ApplicationNo,
            summary: true,
            PEName: k.PEName,
            FilingDate: k.FilingDate,            
            PEServedOn: k.PEServedOn
        };
        this.setState(data);
        this.fetchApplicantDetails(k.ApplicationNo)
        this.fetchPEDetails(k.ApplicationNo)
    };
    ValidateRoom(){
        let FromTime = this.state.FromTime;
        let TOTime = this.state.TOTime;
        let FromTimeArray = FromTime.split(".");
        let ToTimeArray = TOTime.split(".");
      
        if (+ToTimeArray[0] <= +6) {
            let Count1 = 0;
            if (+FromTimeArray[0] > +7) {
                Count1 = (+12 - +FromTimeArray[0]);
            } else {
                Count1 = 0;
            }
            let slot2 = +Count1 + +ToTimeArray[0];
            var i;
            for (i = 0; i < slot2; i++) {
                if (i == 0) {
                    if (this.checkIfBooked(FromTime, this.state.SelectedDate)) {
                        return false;
                    }   
                } else {
                    let newSlot = +FromTimeArray[0] + +i;
                    if (newSlot > +12) {
                        let newSlotTime = (+newSlot - +12);
                     
                        if (this.checkIfBooked(newSlotTime + ".00PM", this.state.SelectedDate)) {
                            return false;
                        }   
                    } else {
                        if (newSlot == 12) {
                           
                            if (this.checkIfBooked(newSlot + ".00PM", this.state.SelectedDate)) {
                                return false;
                            }  
                        } else {
                           
                            if (this.checkIfBooked(newSlot + ".00AM", this.state.SelectedDate)) {
                                return false;
                            }
                        }

                    }
                }
            }
        } else {
            let Count = (+ToTimeArray[0] - +FromTimeArray[0]);
            var i;
            for (i = 0; i < Count; i++) {
                if (i == 0) {
                    if(this.checkIfBooked(FromTime, this.state.SelectedDate)){
                        return false;
                    }                       
                  
                } else {
                    let newSlot = +FromTimeArray[0] + +i;
                    if (newSlot == 12) {
                        if (this.checkIfBooked(newSlot + ".00PM", this.state.SelectedDate)) {
                            return false;
                        }                              
                           
                    } else {
                        if (this.checkIfBooked(newSlot + "." + FromTimeArray[1], this.state.SelectedDate)) {
                            return false;
                        }                        
                         
                    }
                }
            }
        }  
        return true;
    }
    ValidateTOTime() {
        let FromTime = this.state.FromTime;
        let TOTime = this.state.TOTime;
        let FromTimeArray = FromTime.split(".");
        let ToTimeArray = TOTime.split(".");
        
        if ((+ToTimeArray[0] <= +6) && +FromTimeArray[0] < +6) {           
                if ((+ToTimeArray[0] - +FromTimeArray[0]) < +0){
                    return false;
                }            
         
        } else if ((+ToTimeArray[0] > +6) && +FromTimeArray[0] >+6) { 
           
            if ((+ToTimeArray[0] - +FromTimeArray[0]) < +0) {
                return false;
            } 
        } else if ((+ToTimeArray[0] > +6) && +FromTimeArray[0] < +6) {
            return false;            
        }else {
            return true;
          }
          return true;
    }
    HandleUnbook=e =>{
        e.preventDefault();        
        
        const data = {
            VenueID: this.state.VenueID,
            Date: this.state.SelectedDate,
            Slot: this.state.FromTime,
            Content: this.state.ApplicationNo
        };
        this.putData("/api/CaseScheduling", data);
        this.setState({ Unbooking: false });
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.ValidateTOTime()){        
        if (this.ValidateRoom()){
        let FromTime = this.state.FromTime;
        let TOTime = this.state.TOTime;
        let FromTimeArray = FromTime.split(".");
        let ToTimeArray = TOTime.split(".");
         if (+ToTimeArray[0] <= +6){
            let Count1=0;
            if (+FromTimeArray[0] > +7){
                Count1 = (+12 - +FromTimeArray[0]);
            }else{
                Count1=0;
            }            
            let slot2 = +Count1 + +ToTimeArray[0];
            var i;
            for (i = 0; i < slot2; i++) {
                if (i == 0) {
                    const data = {
                        VenueID: this.state.VenueID,
                        Date: this.state.SelectedDate,
                        Slot: FromTime,
                        Content: this.state.ApplicationNo
                    };
                    this.postData("/api/CaseScheduling", data);
                } else {
                    let newSlot = +FromTimeArray[0] + +i;
                    if (newSlot > +12) {
                        let newSlotTime = (+newSlot - +12);
                        const data = {
                            VenueID: this.state.VenueID,
                            Date: this.state.SelectedDate,
                            Slot: newSlotTime + ".00PM",
                            Content: this.state.ApplicationNo
                        };
                        this.postData("/api/CaseScheduling", data);
                    } else {
                        if (newSlot == 12){
                            const data = {
                                VenueID: this.state.VenueID,
                                Date: this.state.SelectedDate,
                                Slot: newSlot + ".00PM",
                                Content: this.state.ApplicationNo
                            };
                            this.postData("/api/CaseScheduling", data);
                        }else{
                            const data = {
                                VenueID: this.state.VenueID,
                                Date: this.state.SelectedDate,
                                Slot: newSlot + ".00AM",
                                Content: this.state.ApplicationNo
                            };
                            this.postData("/api/CaseScheduling", data);
                        }

                    }
                }
            }
        }else{
          let  Count = (+ToTimeArray[0] - +FromTimeArray[0]);
          var i;
            for (i = 0; i < Count; i++) {
                if(i==0){
                    const data = {
                        VenueID: this.state.VenueID,
                        Date: this.state.SelectedDate,
                        Slot: FromTime,
                        Content: this.state.ApplicationNo
                    };
                    this.postData("/api/CaseScheduling", data);
                }else{
                    let newSlot = +FromTimeArray[0]+ +i;
                    if(newSlot==12){
                        const data = {
                            VenueID: this.state.VenueID,
                            Date: this.state.SelectedDate,
                            Slot: newSlot + ".00PM",
                            Content: this.state.ApplicationNo
                        };
                        this.postData("/api/CaseScheduling", data);
                    }else{
                        const data = {
                            VenueID: this.state.VenueID,
                            Date: this.state.SelectedDate,
                            Slot: newSlot + "." + FromTimeArray[1],
                            Content: this.state.ApplicationNo
                        };
                        this.postData("/api/CaseScheduling", data);
                    }                   
                }               
            }
        }             
        }else{
          swal("","One of the selected time is invalid","error")
        }

        } else {
            swal("", "Invalid Time Patterns", "error")
        }
            
    };
    putData(url = ``, data = {}) {
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        })
            .then(response =>
                response.json().then(data => {
                   

                    if (data.success) {
                        swal("", "Slot has been released!", "success");
                        this.fetchBookings();
                        this.setState({ open: false });
                        } else {
                        swal("", data.message, "error");
                    }
                })
            )
            .catch(err => {
                swal("", err.message, "error");
            });
    }
    postData(url = ``, data = {}) {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        })
            .then(response =>
                response.json().then(data => {
                    if (data.success) {
                       
                       
                            swal("", "Room has been booked", "success");
                            this.fetchBookings();
                          
                        this.setState({ showNoticvebtn: true, open: false });
                       
                       
                        
                    } else {
                        if (data.message.includes("VenueID")){
                            swal("", "Select a room to continue", "error");
                        }else{
                            swal("", data.message, "error");
                        }
                        
                    }
                })
            )
            .catch(err => {
                swal("", err.message, "error");
            });
    }
    closeViewerModal=()=>{
        this.setState({ openViewer: false });
    }   
    GenerateNotification = () => {
         
        let data={
            ApplicationNo: this.state.ApplicationNo,
            ApplicantName: this.state.ApplicantDetails[0].Name,
            PEName: this.state.PEName,
            ApplicationDate: dateFormat(this.state.FilingDate, "mediumDate") ,
            PENotificationDate: dateFormat(this.state.PEServedOn, "mediumDate") ,
            HearingDateAndTime: dateFormat(this.state.SelectedDate, "mediumDate")  +" at "+ this.state.FromTime,           
            Venue: this.state.VenueDesc+","+ this.state.RoomName ,
            Noticedate: dateFormat(new Date().toLocaleDateString(), "mediumDate"),
            LogoPath:  process.env.REACT_APP_BASE_URL + "/images/Harambee.png"
        }      
        fetch("api/GenerateHearingNotice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            },
            body: JSON.stringify(data)
            }).then(response =>
                response.json().then(data => {       
                                 
                    this.setState({ FilePath: process.env.REACT_APP_BASE_URL + "/HearingNotices/" + this.state.ApplicationNo + ".pdf" });
                    this.setState({ openViewer: true });
                })
            )
            .catch(err => {
                swal("", err.message, "error");
            });
    }
    render() {
        let FormStyle = {
            margin: "20px"
        };
       
        let headingstyle = {
            color: "#7094db"
        };
        let trstyle={
            background:"#1ab394" 
        }
        let bookedtd={
            background:"#f8ac59"
        }
        
        const ColumnData = [
            {
                label: "Application No",
                field: "Name",
                sort: "asc",
                width: 200
            },
            {
                label: "Procuring Entity",
                field: "ProcuringEntity",
                sort: "asc",
                width: 200
            },
           
            {
                label: "action",
                field: "action",
                sort: "asc",
                width: 200
            }
        ];
        let Rowdata1 = [];

        const rows = [...this.state.casedetails];
        if (rows.length > 0) {
            rows.forEach(k => {
                const Rowdata = {
                    Name: k.ApplicationNo,
                    ProcuringEntity: k.PEName,
              
                    action: (
                        <span>
                            <a

                                style={{ color: "#007bff" }}
                                onClick={e => this.ScheduleCase(k, e)}
                            >
                                Schedule
                                 </a>
                              </span>
                    )
                };
                Rowdata1.push(Rowdata);
            });
        }
        const BranchesOptions = [...this.state.Branches].map((k, i) => {

            return {
                value: k.ID,
                label: k.Description
            };
        });
        let VenuesOptions = [...this.state.Venues].map((r, i) =>{                                                  
            return {
                value: r.ID,
                label: r.Name    }                                   
                                               
                                                
        });
        let TimeOptions=[
            {
                value: "8.00AM",
                label: "8.00AM",
            },
            {
                value: "9.00AM",
                label: "9.00AM",
            },
            {
                value: "10.00AM",
                label: "10.00AM",
            },
            {
                value: "11.00AM",
                label: "11.00AM",
            },
            {
                value: "12.00PM",
                label: "12.00PM",
            },
            {
                value: "1.00PM",
                label: "1.00PM",
            },
            {
                value: "2.00PM",
                label: "2.00PM",
            },
            {
                value: "3.00PM",
                label: "3.00PM",
            },
            {
                value: "4.00PM",
                label: "4.00PM",
            },
            {
                value: "5.00PM",
                label: "5.00PM",
            },
            {
                value: "6.00PM",
                label: "6.00PM",
            }
        ]
        let FromTimeOptions = [
            {
                value: "8.00AM",
                label: "8.00AM",
            },
            {
                value: "9.00AM",
                label: "9.00AM",
            },
            {
                value: "10.00AM",
                label: "10.00AM",
            },
            {
                value: "11.00AM",
                label: "11.00AM",
            },
            {
                value: "12.00PM",
                label: "12.00PM",
            },
            {
                value: "1.00PM",
                label: "1.00PM",
            },
            {
                value: "2.00PM",
                label: "2.00PM",
            },
            {
                value: "3.00PM",
                label: "3.00PM",
            },
            {
                value: "4.00PM",
                label: "4.00PM",
            },
            {
                value: "5.00PM",
                label: "5.00PM",
            }
        ]
        let DivvenuesStyle={
            width:"90%",
            margin:"0 auto"
        }
    
      //  let HandleVenueClick = this.HandleVenueClick
        let checkIfBooked = this.checkIfBooked;
        let HoverBtn = this.HoverBtn;
        let ToolTipText = this.state.ToolTipText;
        let BookRoom = this.BookRoom;
        let UnBookRoom = this.UnBookRoom;
        if (this.state.summary) {
            return (
                <div>
                    <ToastContainer />
                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-10">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <h2>Case Scheduling For Application: <span style={headingstyle}>{this.state.ApplicationNo}</span> </h2>
                                </li>
                            </ol>
                        </div>
                        <div className="col-lg-2">
                            <div className="row wrapper ">

                                <button
                                    type="button"
                                    style={{ marginTop: 40 }}
                                    onClick={this.openModal}
                                    onClick={this.switchMenu}
                                    className="btn btn-primary  "
                                >
                                    Back
                  </button>
                            </div>
                        </div>
                    </div>
                    <Popup
                        open={this.state.open}
                       
                        onClose={this.closeModal}
                    >
                        <div className={popup.modal}>
                            <a className="close" onClick={this.closeModal}>
                                &times;</a>
                            <div className={popup.header} className="font-weight-bold">
                                {" "}
                                ROOM BOOKING{" "}
                            </div>
                            <div className={popup.content}>
                                <div className="container-fluid">
                                    <div className="col-sm-12">
                                        <div className="ibox-content">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className=" row">
                                                    <div className="col-sm">
                                                        <div className="form-group">
                                                            <label
                                                                htmlFor="exampleInputEmail1"
                                                                className="font-weight-bold"
                                                            >
                                                                DATE
                                                                         </label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                disabled                                                             
                                                                value={this.state.SelectedDate}                                                                
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm">
                                                        <div className="form-group">
                                                            <label
                                                                htmlFor="exampleInputEmail1"
                                                                className="font-weight-bold"
                                                            >
                                                                VENUE
                                                                         </label>
                                                            <input
                                                                type="text"
                                                                class="form-control"                                                             
                                                               disabled
                                                                value={this.state.VenueDesc}
                                                              required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" row">
                                                    <div className="col-sm">
                                                        <div className="form-group">
                                                            <label
                                                                htmlFor="exampleInputEmail1"
                                                                className="font-weight-bold"
                                                            >
                                                                ROOM
                                                                         </label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                disabled
                                                                value={this.state.RoomName}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm">
                                                        <div className=" row">
                                                             <div className="col-sm">
                                                        <div className="form-group">
                                                            <label
                                                                htmlFor="exampleInputEmail1"
                                                                className="font-weight-bold"
                                                            >
                                                                FROM
                                                                         </label>
                                                            <Select
                                                            name="FromTime"
                                                                onChange={this.handleSelectChange}
                                                                        options={FromTimeOptions}
                                                                        value={FromTimeOptions.filter(
                                                                option =>
                                                                          option.label === this.state.FromTime
                                                            )}
                                                               
                                                                required
                                                            />
                                                        </div>
                                                            </div>
                                                            <div className="col-sm">
                                                        <div className="form-group">
                                                            <label
                                                                htmlFor="exampleInputEmail1"
                                                                className="font-weight-bold"
                                                            >
                                                                TO
                                                                         </label>
                                                            <Select
                                                                name="TOTime"
                                                                        value={TimeOptions.filter(
                                                                            option =>
                                                                                option.label === this.state.TOTime
                                                                        )}

                                                                onChange={this.handleSelectChange}
                                                                options={TimeOptions}
                                                                required
                                                            />
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-sm-12 ">
                                                    <div className=" row">
                                                        <div className="col-sm-2" />
                                                        <div className="col-sm-8" />
                                                        <div className="col-sm-2">
                                                            {this.state.Unbooking ? (<button
                                                                type="button"
                                                                className="btn btn-warning float-left"
                                                                onClick={this.HandleUnbook}
                                                            >
                                                                RELEASE
                                                         </button>): <button
                                                                type = "submit"
                                                                className = "btn btn-primary float-left"
                                                                >
                                                                CONFIRM
                                                        </button>}   
                                                         
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popup>
                    <div className="wrapper wrapper-content animated fadeInRight">
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-10 border border-success rounded bg-white">
                                <form style={FormStyle} onSubmit={this.SaveTenders}>
                                    <div class="row">
                                        <div class="col-sm-2">
                                            <label
                                                for="ApplicantID"
                                                className="font-weight-bold "
                                            >
                                                Application NO{" "}
                                            </label>
                                        </div>

                                        <div class="col-sm-4">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name="ApplicationNo"
                                                    disabled

                                                    value={this.state.ApplicationNo}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="col-sm-11 ">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <h3 style={headingstyle}>
                                                            Applicant
                                                    </h3>


                                                    </div>

                                                </div>
                                                <div className="row border border-success rounded">
                                                    <table className="table table-borderless table-sm">
                                                        {this.state.ApplicantDetails.map(
                                                            (r, i) => (
                                                                <div>
                                                                    <tr>
                                                                        <td className="font-weight-bold">Name:</td>
                                                                        <td>{r.Name}</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td className="font-weight-bold">Address:</td>
                                                                        <td>{r.POBox + "-" + r.PostalCode + " " + r.Town}</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td className="font-weight-bold">Email:</td>
                                                                        <td>{r.Email}</td>
                                                                    </tr>
                                                                    <tr>

                                                                        <td className="font-weight-bold">Telephone</td>
                                                                        <td>{r.Mobile}</td>
                                                                    </tr>
                                                                </div>
                                                            )
                                                        )}
                                                    </table>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="col-sm-6 ">
                                            <div class="col-sm-11 ">
                                                <div className="row">
                                                    <div className="col-sm-12">


                                                        <h3 style={headingstyle}>
                                                            Procuring Entity
                                                    </h3>
                                                    </div>

                                                </div>
                                                <div className="row border border-success rounded">
                                                    <table className="table table-borderless table-sm">
                                                        {this.state.PEDetails.map(
                                                            (r, i) => (
                                                                <div>
                                                                    <tr>
                                                                        <td className="font-weight-bold">Name:</td>
                                                                        <td>{r.Name}</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td className="font-weight-bold">Address:</td>
                                                                        <td>{r.POBox + "-" + r.PostalCode + " " + r.Town}</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td className="font-weight-bold">Email:</td>
                                                                        <td>{r.Email}</td>
                                                                    </tr>
                                                                    <tr>

                                                                        <td className="font-weight-bold">Telephone</td>
                                                                        <td>{r.Telephone}</td>
                                                                    </tr>
                                                                </div>
                                                            )
                                                        )}
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>

                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-10 border border-success rounded">
                                <form style={FormStyle} onSubmit={this.CheckRoomAvailability} >
                                    <h5 style={headingstyle}>Check Room Availability</h5>
                                   
                                    <div className="row">
                                        <table className="table table-borderless table-sm">
                                            <tr>
                                                <td>                                                     
                                                        Venue                                                                                                 
                                             </td>                                            
                                          <td>    
                                           {/* <div style={TdStyle}> */}
                                                  <Select                                                          
                                                           name="Branch"
                                                            onChange={this.handleSelectChange}
                                                            options={BranchesOptions}
                                                            required
                                                        />
                                                     {/* </div> */}
                                                  

                                                </td>
                                                <td>   Room   </td>
                                                <td>
                                                    <Select
                                                      
                                                        name="VenueID"
                                                        onChange={this.handleSelectChange}
                                                        options={VenuesOptions}
                                                        required
                                                    /></td>

                                                
                                    
                                        </tr>
                                        <tr>
                                             
                                                <td>   From   </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        name="FromDate"
                                                        required
                                                        min={this.state.Today}
                                                        className="form-control"
                                                        onChange={this.handleInputChange}

                                                    /> </td>
                                                <td>To  </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        name="ToDate"
                                                        required
                                                        min={dateFormat(this.state.FromDate, "isoDate")}
                                                        className="form-control"
                                                        onChange={this.handleInputChange}

                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                    >
                                                        Check Availability  </button>
                                                        &nbsp;
                                                     


                                                </td>
                                        </tr>
                                       </table>

                                    </div>
                                   
                                 </form>
                            
                                 
                                <div className="row">
                                   
                                    <div style={DivvenuesStyle}>
                                        <table className="table table-sm table-bordered">
                                        <th>Date</th>
                                        <th>8.00AM</th>
                                        <th>9.00AM</th>
                                        <th>10.00AM</th>
                                        <th>11.00AM</th>
                                        <th>12.00PM</th>
                                        <th>1.00PM</th>
                                        <th>2.00PM</th>
                                        <th>3.00PM</th>
                                        <th>4.00PM</th>
                                        <th>5.00PM</th>
                                        
                                        {this.state.DaysArray.map(function (r, i) {                                        
                                                return (
                                                    <tr id={i}>
                                                        <td >
                                                            {r.Date}
                                                            
                                                        </td>
                                                        {checkIfBooked("8.00AM", r.Date) ? (
                                                            <td style={bookedtd} onClick={() => UnBookRoom("8.00AM", r.Date)}>                                                          
                                                                <button className="btn btn-warning" ID="tooltip" >Booked
                                                                 <span class="tooltiptext">{ToolTipText}</span>
                                                                 </button>                                                           
                                                        </td>
                                                        ) : <td style={trstyle} onClick={() => BookRoom("8.00AM", r.Date)}>                                                              
                                                            </td>}
                                                        {checkIfBooked("9.00AM", r.Date) ? (
                                                            <td style={bookedtd} onClick={() => UnBookRoom("9.00AM", r.Date)}>    
                                                                <button className="btn btn-warning" ID="tooltip" >Booked
                                                                 <span class="tooltiptext">{ToolTipText}</span>
                                                                </button>
                                                            </td>
                                                        ) : <td style={trstyle} onClick={() => BookRoom("9.00AM", r.Date)}> </td>}
                                                        {checkIfBooked("10.00AM", r.Date) ? (
                                                            <td style={bookedtd} onClick={() => UnBookRoom("10.00AM", r.Date)}>    
                                                                <button className="btn btn-warning" ID="tooltip" >Booked
                                                                 <span class="tooltiptext">{ToolTipText}</span>
                                                                </button>
                                                            </td>
                                                        ) : <td style={trstyle} onClick={() => BookRoom("10.00AM", r.Date)}> </td>}
                                                        {checkIfBooked("11.00AM", r.Date) ? (
                                                            <td style={bookedtd} onClick={() => UnBookRoom("11.00AM", r.Date)}>    
                                                                <button className="btn btn-warning" ID="tooltip" >Booked
                                                                 <span class="tooltiptext">{ToolTipText}</span>
                                                                </button>
                                                            </td>
                                                        ) : <td style={trstyle} onClick={() => BookRoom("11.00AM", r.Date)}> </td>}
                                                        {checkIfBooked("12.00PM", r.Date) ? (
                                                            <td style={bookedtd} onClick={() => UnBookRoom("12.00PM", r.Date)}>    
                                                                <button className="btn btn-warning" ID="tooltip" >Booked
                                                                 <span class="tooltiptext">{ToolTipText}</span>
                                                                </button>
                                                            </td>
                                                        ) : <td style={trstyle} onClick={() => BookRoom("12.00PM", r.Date)}> </td>}
                                                        {checkIfBooked("1.00PM", r.Date) ? (
                                                            <td style={bookedtd} onClick={() => UnBookRoom("1.00PM", r.Date)}>    
                                                                <button className="btn btn-warning" ID="tooltip" >Booked
                                                                 <span class="tooltiptext">{ToolTipText}</span>
                                                                </button>
                                                            </td>
                                                        ) : <td style={trstyle} onClick={() => BookRoom("1.00PM", r.Date)}> </td>}
                                                        {checkIfBooked("2.00PM", r.Date) ? (
                                                            <td style={bookedtd} onClick={() => UnBookRoom("2.00PM", r.Date)}>    
                                                                <button className="btn btn-warning" ID="tooltip" >Booked
                                                                 <span class="tooltiptext">{ToolTipText}</span>
                                                                </button>
                                                            </td>
                                                        ) : <td style={trstyle} onClick={() => BookRoom("2.00PM", r.Date)}> </td>}
                                                        {checkIfBooked("3.00PM", r.Date) ? (
                                                            <td style={bookedtd} onClick={() => UnBookRoom("3.00PM", r.Date)}>    
                                                                <button className="btn btn-warning" ID="tooltip" >Booked
                                                                 <span class="tooltiptext">{ToolTipText}</span>
                                                                </button>
                                                            </td>
                                                        ) : <td style={trstyle} onClick={() => BookRoom("3.00PM", r.Date)}> </td>}
                                                        {checkIfBooked("4.00PM", r.Date) ? (
                                                            <td style={bookedtd} onClick={() => UnBookRoom("4.00PM", r.Date)}>    
                                                                <button className="btn btn-warning" ID="tooltip" >Booked
                                                                 <span class="tooltiptext">{ToolTipText}</span>
                                                                </button>
                                                            </td>
                                                        ) : <td style={trstyle} onClick={() => BookRoom("4.00PM", r.Date)}> </td>}
                                                        {checkIfBooked("5.00PM", r.Date) ? (
                                                            <td style={bookedtd} onClick={() => UnBookRoom("5.00PM", r.Date)}>    
                                                                <button className="btn btn-warning" ID="tooltip" >Booked
                                                                 <span class="tooltiptext">{ToolTipText}</span>
                                                                </button>
                                                            </td>
                                                        ) : <td style={trstyle} onClick={() => BookRoom("5.00PM", r.Date)}> </td>}
                                                      
                                                    </tr>
                                                );
                                            }
                                        )}
                                       
                                        
                                       
                                   </table>
                                      
                                         
                                       
                                   </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-9">

                                    </div>
                                    <div className="col-sm-3">

                                    {this.state.showNoticvebtn ? (
                                        <button
                                            type="button"
                                            onClick={this.GenerateNotification}
                                            className="btn btn-success"
                                        >
                                            Preview Notice </button>) : null}
                                            &nbsp;
                                    <Link to="/">
                                        <button
                                            type="button"
                                            className="btn btn-warning "
                                        >
                                            Close
                                            </button>
                                    </Link>
</div>
                                </div>

                                <br />
                            </div>
                        </div>
                    </div>

                    <Modal visible={this.state.openViewer} width="750" height="600" effect="fadeInUp" >
                        <a style={{ float: "right", color: "red", margin: "10px" }} href="javascript:void(0);" onClick={() => this.closeViewerModal()}><i class="fa fa-close"></i></a>
                        <div>
                            <h4 style={{ "text-align": "center", color: "#1c84c6" }}>Hearing Notice</h4>
                            <div className="container-fluid">
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col col-sm-8">

                                        </div>
                                        <div className="col col-sm-1">
                                            <button className="btn btn-success" onClick={this.sendAttachment}>Email</button>
                                    </div>
                                    &nbsp;
                                        <div className="col col-sm-2">
                                            <button type="button" onClick={this.Downloadfile} className="btn btn-primary" >Download</button>



                                        </div>

                                    </div>
                                    <br />
                                    <object
                                        width="100%"
                                        height="450"
                                        data={this.state.FilePath}
                                        type="application/pdf"
                                    >
                                        {" "}
                                    </object>
                                
                                     </div>
                            </div>

                        </div>
                    </Modal>

                 
                </div>
            );
        } else {
            return (
                <div>
                    <ToastContainer/>
                    <div>
                        <div className="row wrapper border-bottom white-bg page-heading">
                            <div className="col-lg-10">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <h2>Case Scheduling</h2>
                                    </li>
                                </ol>
                            </div>
                            <div className="col-lg-2">
                                <div className="row wrapper ">
                                    <Link to="/">
                                        <button
                                            type="button"
                                            style={{ marginTop: 40 }}
                                            onClick={this.openModal}
                                            className="btn btn-warning  "
                                        >
                                            &nbsp; Close
                  </button>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>

                    <TableWrapper>
                        <Table Rows={Rowdata1} columns={ColumnData} />
                    </TableWrapper>
                </div>
            )
        }
    }
}

export default CaseScheduling;
