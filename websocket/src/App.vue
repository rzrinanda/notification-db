<template>
  <div class="container">
    <div class="flex justify-between">
      <div>
        <h1>Send Notification</h1>

        <!-- <chat-form /> -->
        <form method="POST" @submit.prevent="sendMessage">
          <p>
            Me
            <input type="text" v-model="me" required />
          </p>
          <p>
            To
            <input type="text" v-model="to" required />
            <button type="button" @click="privateMessage">Private Message</button>
          </p>
          <p>
            Message
            <input type="text" v-model="message" required />
          </p>

          <button type="submit">Public Message</button>
        </form>
        <ul>
          <li v-for="(msg, i) in incomingMessages" :key="i">
            <!-- [{{ msg.date }}]   -->
            {{ msg.name }} :
            {{ msg.message }}
          </li>
        </ul>
        <ul>
          <li v-for="(msg, i) in incomingPrivateMessages" :key="i">
            <!-- [{{ msg.date }}]   -->
            {{ msg.name }} :
            {{ msg.message }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import ChatForm from "./components/ChatForm";
import axios from "axios";

export default {
  component: {
    ChatForm
  },
  data: () => ({
    notifier: new Notyf(),
    me: "person1",
    to: "person2",
    message: "Hello",
    incomingMessages: [],
    incomingPrivateMessages: [],
    connection: null
  }),

  mounted() {
    this.registerWS();
  },

  methods: {
    sendMessage() {
      const data = JSON.stringify({
        private: false,
        from: this.me,
        to: this.to,
        message: this.message
      });
      const form = {
        name: this.me,
        to: this.to,
        message: this.message,
        date: new Date()
      }

      this.connection.send(data);
      const response = axios.post("chats/insert", form);
      console.log(response)
    },

    privateMessage() {
      const data = JSON.stringify({
        private: true,
        from: this.me,
        to: this.to,
        message: this.message
      });

      const payload = {
        name: this.me,
        date: new Date().toISOString(),
        message: this.message
      };

      this.incomingPrivateMessages.push(payload);

      this.connection.send(data);
      const response = axios.post("chats/insert", form);
      console.log(response)
    },

    registerWS() {
      const url = "ws://localhost:8001";
      this.connection = new WebSocket(url);

      this.connection.onopen = event => {
        console.log("We are connected", event);
      };

      this.connection.onerror = error => {
        console.log(`WebSocket error: ${error}`);
      };

      this.connection.onmessage = event => {
        const data = JSON.parse(event.data);

        console.log(data);

        if (data.private && data.to === this.me) {
          const payload = {
            name: data.from,
            date: new Date().toISOString(),
            message: data.message
          };

          this.incomingPrivateMessages.push(payload);

          this.notifier.success(data.message);
        } else if (!data.private) {
          const payload = {
            name: data.from,
            date: new Date().toISOString(),
            message: data.message
          };

          this.incomingMessages.push(payload);

          this.notifier.success(data.message);
        }
      };
    }
  }
};
</script>

<style scoped>
.container {
  margin: auto;
  width: 800px;
}
.flex {
  display: flex;
}
.justify-between {
  justify-content: space-between;
}
</style>
