// adding new chat documents
// setting up a real-time listener to get new chats
// updating the username
// updating the room

class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message) {
        //Format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //Save the chat document
        const response = await this.chats.add(chat);
        return response;
    }
    getChats(callback){
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        //Update UI
                        callback(change.doc.data());
                    }
                });
            })
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }
    updateRoom(room){
        this.room = room;
        console.log('Room updated');
        if(this.unsub){
            this.unsub();
        }
    }
}

//const chatroom = new Chatroom('general', 'sanji');
//console.log(chatroom);
/*chatroom.addChat('Hello everyone')
    .then(() => console.log('Chat added'))
    .catch(err => console.log(err));*/

// chatroom.getChats((data)=>{
//     console.log(data);
// })

//chatroom.updateRoom('gaming');

/*setTimeout(() => {
    chatroom.updateRoom('gaming');
    chatroom.updateName('Himanshu');
    chatroom.getChats((data)=>{
        console.log(data);
    })
    chatroom.addChat('hello');
});*/
