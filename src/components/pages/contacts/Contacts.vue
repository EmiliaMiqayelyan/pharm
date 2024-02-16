<template>
  <div class="contact_page">
    <div style="margin: 0 auto; width: 92%" class="mt-5">
      <iframe
          id="map-canvas"
          class="map_part"
          width="100%"
          height="500"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Yerevan%207/43%20Nansen+(My%20Business%20Name)&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
      </iframe>
    </div>
    <div class="contact_content">
      <div class="contact-form-section">
        <div class="contact_form">
          <p class="contact_form_heading">{{ $t('contacts.contacts') }}</p>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactsService from "../../../services/ContactsService";

export default {
  name: "ContactPage",
  metaInfo: {
    title: 'Pharm',
    titleTemplate: '%s | Contacts',
  },

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

.contact_content {
  margin-top: 100px;
}

.contact-form-section {
  padding: 20px;
  background-color: white;
  width: 45%;
  margin-top: -120px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.contact_content {
  padding: 4% 13%;
  background-color: var(--main-color);
}

.contact_form_heading {
  color: var(--main-color);
  font-size: 35px;
  font-weight: 600;
}

.contact_form_inputs {
  padding: 2%;
  width: 100%;
  background-color: #EDF1FC;
  border-radius: 3px 3px 3px 3px;
  border: none;
}

.forms {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.contact_send_btn {
  background-color: var(--main-color);
  border: none;
  color: white;
  padding: 1.5% 13%;
  font-size: 20px;
  border-radius: 5px;
  margin-top: 5%;
}

::placeholder {
  color: #AAB4D2;
  font-size: 17px;
}

.contact_form {
  width: 100%;
}

.contact_btn {
  display: flex;
  justify-content: flex-end;
}

@media only screen and (max-width: 1430px) {
  .contact_content {
    padding: 4% 7%;
  }
}

@media only screen and (max-width: 1390px) {
.contact_content {
    padding: 4% 4%;
  }
}

@media only screen and (max-width: 990px) {
  .contact_form {
    width: 100%;
  }
}

@media only screen and (max-width: 495px) {
  .contact_form_heading {
    font-size: 25px;
  }
}
</style>