<template>
  <div>
    <b-button v-b-modal.modal-center>Order Product</b-button>

    <b-modal id="modal-center" centered>
      <div class="forms">
        <div>
          <input v-model="customerMessage.name" type="text" class="contact_form_inputs"
                 :placeholder="$t('contacts.name')"/>
        </div>
        <div class="d-flex gap-3">
          <input v-model="customerMessage.email" type="email" class="contact_form_inputs"
                 :placeholder="$t('contacts.email')"
                 required/>
          <input v-model="customerMessage.phone" type="text" class="contact_form_inputs"
                 :placeholder="$t('contacts.phone')"/>
        </div>
        <textarea v-model="customerMessage.comment" class="contact_form_inputs"
                  :placeholder="$t('contacts.comment')" required/>
      </div>

      <div class="contact_btn">
        <button class="contact_send_btn" @click="onClickSendEmail">{{ $t('contacts.send') }}</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import ContactsService from "@/services/ContactsService";

export default {
  name: "OrderModal",

  data() {
    return {
      contacts: {
        phone_1: '',
        phone_2: '',
        email: '',
        address: '',
        facebook: '',
        instagram: '',
      },

      customerMessage: {
        name: '',
        email: '',
        phone: '',
        comment: ''
      }
    }
  },

  mounted() {
    this.getContacts()
  },

  methods: {
    async getContacts() {
      const contacts = await new ContactsService().get()
      this.contacts = contacts.data.contacts
    },

    async onClickSendEmail() {
      if (!(this.customerMessage.email || this.customerMessage.comment)) return

      await new ContactsService().customerSendEmail(this.customerMessage)

      this.customerMessage = {
        name: '',
        email: '',
        phone: '',
        comment: ''
      }
    }
  }
}
</script>

<style scoped>
>>> .btn-secondary{
  background-color: var(--main-color) !important;
  border: none;
  color: white;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  border-radius: 5px 5px 0 0 !important;
  font-weight: 500;
}

>>>.contact_form_inputs {
  padding: 2%;
  width: 100%;
  background-color: #EDF1FC;
  border-radius: 3px 3px 3px 3px;
  border: none;
}

>>>.forms {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

>>> .modal-footer{
  display: none;
}

>>>.contact_send_btn {
  background-color: var(--main-color);
  border: none;
  color: white;
  padding: 1.5% 13%;
  font-size: 20px;
  border-radius: 5px;
  margin-top: 5%;
}

.contact_btn{
  display: flex;
  justify-content: end;
  align-items: end;
}

>>>.close {
  width: 30px;
  height: 30px;
  padding-bottom: 3px;
  border: none;
  background-color: var(--main-color) !important;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  text-align: center;
}
</style>