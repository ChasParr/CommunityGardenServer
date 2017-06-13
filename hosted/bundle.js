"use strict";

var domoRenderer = void 0;
var domoForm = void 0;
var DomoFormClass = void 0;
var DomoListClass = void 0;

var handleDomo = function handleDomo(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#domoName").val() == '' || $("#domoAge").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
        domoRenderer.loadDomosFromServer();
    });
    return false;
};

var renderDomo = function renderDomo() {
    return React.createElement(
        "form",
        { id: "domoForm",
            onSubmit: this.handleSubmit,
            name: "domoForm",
            action: "/maker",
            method: "POST",
            className: "domoForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Domo Name" }),
        React.createElement(
            "label",
            { htmlFor: "age" },
            "Name: "
        ),
        React.createElement("input", { id: "domoAge", type: "text", name: "age", placeholder: "Domo Age" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
        React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Make Domo" })
    );
};

var renderDomoList = function renderDomoList() {
    if (this.state.data.length === 0) {
        return React.createElement(
            "div",
            { className: "domoList" },
            React.createElement(
                "h3",
                { className: "emptyDomo" },
                "No Domos yet"
            )
        );
    }

    var domoNodes = this.state.data.map(function (domo) {
        return React.createElement(
            "div",
            { key: domo._id, className: "domo" },
            React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "domo face", className: "domoFace" }),
            React.createElement(
                "h3",
                { className: "domoName" },
                " Name: ",
                domo.name,
                " "
            ),
            React.createElement(
                "h3",
                { className: "domoAge" },
                " Age: ",
                domo.age,
                " "
            )
        );
    });

    return React.createElement(
        "div",
        { className: "domoList" },
        domoNodes
    );
};
/*
const setup = function(csrf) {
    DomoFormClass = React.createClass({
        handleSubmit: handleDomo,
        render: renderDomo,
    });
    
    DomoListClass = React.createClass({
        loadDomosFromServer: function() {
            sendAjax('GET', '/getDomos', null, function(data) {
                this.setState({data:data.domos});
            }.bind(this));
        },
        getInitialState: function() {
            return {data: []};
        },
        componentDidMount: function() {
            this.loadDomosFromServer();
        },
        render: renderDomoList
        });
    const makeDomo = document.querySelector("#makeDomo");
    
    if (makeDomo){
        domoForm = ReactDOM.render(
            <DomoFormClass csrf={csrf} />, makeDomo
        );
    }
    
    const domos = document.querySelector("#domos");
    
    if (makeDomo){
        domoRenderer = ReactDOM.render(
            <DomoListClass />, domos
        );
    }
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
}

$(document).ready(function() {
    getToken();
});
*/
"use strict";

var passForm = void 0;
var PassFormClass = void 0;

var handlePass = function handlePass(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#old").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }

    console.dir(redirect);
    sendAjax('POST', $("#passForm").attr("action"), $("#passForm").serialize(), redirect);

    return false;
};

var renderPass = function renderPass() {
    return React.createElement(
        "form",
        { id: "passForm", name: "passForm",
            onSubmit: this.handleSubmit,
            action: "/changePass",
            method: "POST",
            className: "mainForm"
        },
        React.createElement(
            "label",
            { htmlFor: "oldPass" },
            "Old Password: "
        ),
        React.createElement("input", { id: "oldPass", type: "password", name: "oldPass", placeholder: "password" }),
        React.createElement(
            "label",
            { htmlFor: "pass" },
            "Password: "
        ),
        React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
        React.createElement(
            "label",
            { htmlFor: "pass2" },
            "Password: "
        ),
        React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "retype password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "Change" })
    );
};

var createPassForm = function createPassForm(csrf) {
    var PassForm = React.createClass({
        displayName: "PassForm",

        handleSubmit: handlePass,
        render: renderPass
    });

    var changePass = document.querySelector("#changePass");

    if (changePass) {
        passForm = ReactDOM.render(React.createElement(PassForm, { csrf: csrf }), changePass);
    }
};

var setupPass = function setupPass(csrf) {

    createPassForm(csrf);
};

var getTokenPass = function getTokenPass() {
    sendAjax('GET', '/getToken', null, function (result) {
        setupPass(result.csrfToken);
    });
};

$(document).ready(function () {
    getTokenPass();
});
"use strict";

var RoomListClass = void 0;
var roomRenderer = void 0;
var roomForm = void 0;
var RoomFormClass = void 0;

var handleRoom = function handleRoom(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#roomName").val() == '') {
        handleError("All fields are required");
        return false;
    }
    sendAjax('POST', $("#roomForm").attr("action"), $("#roomForm").serialize(), function () {
        roomRenderer.loadRoomsFromServer();
    });
    return false;
};

var joinRoom = function joinRoom(e) {
    e.preventDefault();
    //let roomName = e.target.value;
    console.log(e.currentTarget);
    var body = e.currentTarget.value;
    console.log(body);
    sendAjax('POST', '/joinRoom', body, redirect);
    return false;
};

var renderRoomList = function renderRoomList() {
    if (this.state.data.length === 0) {
        return React.createElement(
            "div",
            { className: "roomList" },
            React.createElement(
                "h3",
                { className: "emptyRooms" },
                "No Rooms yet"
            )
        );
    }

    var csrfStr = "&_csrf=" + this.csrf;
    var roomNodes = this.state.data.map(function (room) {
        var body = "room=" + encodeURIComponent(room.roomName) + csrfStr;
        return React.createElement(
            "button",
            { key: room._id, type: "submit", className: "room", onClick: joinRoom, value: body },
            React.createElement("img", { src: "/assets/img/daisy head.png", alt: "daisy head", className: "daisyHead" }),
            React.createElement(
                "h3",
                { className: "roomName" },
                " Name: ",
                room.roomName,
                " "
            ),
            React.createElement(
                "h3",
                { className: "roomOwner" },
                " Owner: ",
                room.ownerName,
                " "
            )
        );
    });

    return React.createElement(
        "div",
        { className: "roomList" },
        roomNodes
    );
};

var renderRoomMaker = function renderRoomMaker() {
    return React.createElement(
        "form",
        { id: "roomForm",
            onSubmit: this.handleSubmit,
            name: "roomForm",
            action: "/newRoom",
            method: "POST",
            className: "roomForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "roomName", type: "text", name: "roomName", placeholder: "Room Name" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
        React.createElement("input", { className: "makeRoomSubmit", type: "submit", value: "Make Room" })
    );
};

var setup = function setup(csrf) {
    console.log(csrf);
    var newRoomButton = document.querySelector("#newRoomButton");
    var makeRoom = document.querySelector("#makeRoom");

    newRoomButton.addEventListener("click", function (e) {
        e.preventDefault();
        if (makeRoom) {
            RoomFormClass = React.createClass({
                displayName: "RoomFormClass",

                handleSubmit: handleRoom,
                render: renderRoomMaker
            });
            roomForm = ReactDOM.render(React.createElement(RoomFormClass, { csrf: csrf }), makeRoom);
        }
        return false;
    });

    RoomListClass = React.createClass({
        displayName: "RoomListClass",

        loadRoomsFromServer: function loadRoomsFromServer() {
            console.log('get rooms');
            sendAjax('GET', '/getRooms', null, function (data) {
                this.setState({ data: data.rooms });
            }.bind(this));
        },
        getInitialState: function getInitialState() {
            return { data: [] };
        },
        componentDidMount: function componentDidMount() {
            this.loadRoomsFromServer();
        },
        render: renderRoomList,
        csrf: csrf
    });
    var roomList = document.querySelector("#rooms");

    if (roomList) {
        roomRenderer = ReactDOM.render(React.createElement(RoomListClass, null), rooms);
    }
};

//const setupGarden = function(csrf) {
//    
//}

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
  console.dir(response);
  $("#domoMessage").animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    }
  });
};
