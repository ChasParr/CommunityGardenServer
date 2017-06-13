
let RoomListClass;
let roomRenderer;
let roomForm;
let RoomFormClass;

const handleRoom = (e) => {
    e.preventDefault();
    
    $("#domoMessage").animate({width:'hide'}, 350);
    
    if($("#roomName").val() == '') {
        handleError("All fields are required");
        return false;
    }
    sendAjax('POST', $("#roomForm").attr("action"), $("#roomForm").serialize(), function() {
        roomRenderer.loadRoomsFromServer();
    });
    return false;
};

const joinRoom = function (e) {
    e.preventDefault();
    //let roomName = e.target.value;
    console.log(e.currentTarget);
    let body = e.currentTarget.value;
    console.log(body);
    sendAjax('POST', '/joinRoom', body, redirect);
    return false;
};

const renderRoomList = function(){
    if (this.state.data.length === 0) {
        return (
            <div className="roomList" >
                <h3 className="emptyRooms">No Rooms yet</h3>
            </div>
        );
    }
    
    let csrfStr = "&_csrf=" + this.csrf;
    const roomNodes = this.state.data.map(function(room) {
            let body = "room=" + encodeURIComponent(room.roomName) + csrfStr;
        return (
            <button key={room._id} type="submit" className="room" onClick={joinRoom} value={body} >
                <img src="/assets/img/daisy head.png" alt="daisy head" className="daisyHead" />
                <h3 className="roomName"> Name: {room.roomName} </h3>
                <h3 className="roomOwner"> Owner: {room.ownerName} </h3>
            </button>
        );
    });
    
    return (
        <div className="roomList">
            {roomNodes}
        </div>
    );
};

const renderRoomMaker = function(){
    return (
        <form id="roomForm"
            onSubmit={this.handleSubmit}
            name="roomForm"
            action="/newRoom"
            method="POST"
            className="roomForm"
        >
            <label htmlFor="name">Name: </label>
        <input id="roomName" type="text" name="roomName" placeholder="Room Name"/>
        <input type="hidden" name="_csrf" value={this.props.csrf} />
        <input className="makeRoomSubmit" type="submit" value="Make Room" />
        </form>
        
    );
}

const setup = function(csrf) {
    console.log(csrf);
    const newRoomButton = document.querySelector("#newRoomButton");
    const makeRoom = document.querySelector("#makeRoom");
    
    
    newRoomButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (makeRoom){
            RoomFormClass = React.createClass({
                handleSubmit: handleRoom,
                render: renderRoomMaker,
            });
            roomForm = ReactDOM.render(
                <RoomFormClass csrf={csrf} />, makeRoom
            );
        }
        return false;
    });
    
    RoomListClass = React.createClass({
        loadRoomsFromServer: function() {
            console.log('get rooms');
            sendAjax('GET', '/getRooms', null, function(data) {
                this.setState({data:data.rooms});
            }.bind(this));
        },
        getInitialState: function() {
            return {data: []};
        },
        componentDidMount: function() {
            this.loadRoomsFromServer();
        },
        render: renderRoomList,
        csrf: csrf
    });
    const roomList = document.querySelector("#rooms");
    
    if (roomList){
        roomRenderer = ReactDOM.render(
            <RoomListClass />, rooms
        );
    }
};

//const setupGarden = function(csrf) {
//    
//}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
}

$(document).ready(function() {
    getToken();
});