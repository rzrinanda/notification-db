<template>
    <form method="POST" @submit.prevent="sendMessage">
          <p>
            Me <input type="text" v-model="me" required/>
          </p>
          <p>
            To <input type="text" v-model="to" required/> <button type="button" @click="privateMessage">Private Message</button>
          </p>
          <p>
            Message <input type="text" v-model="message" required />
          </p>

          <button type="submit">Public Message</button>
        </form>
</template>
<script>
export default {
  methods:{
    sendMessage() {
      const data = JSON.stringify({
        private: false,
        from: this.me,
        to: this.to,
        message: this.message
      });

      this.connection.send(data);
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
    },
  }
}
</script>