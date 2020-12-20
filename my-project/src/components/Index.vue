<template v-if="this.bookList">
<b-container >

<h2><b-badge pill variant="primary">Lendo Atualmente</b-badge></h2>
 <b-row align-v = "center" order-xl> 
    <b-card-group deck v-for="row in this.currentlyReading" min-cols="3">
        <b-card
                style="width: 20rem; height: 18rem"
                class="mb-2"
                min-cols = "3">
            <b-card-img :src="`${row.imageLinks.smallThumbnail}`" style="width: 5rem; height: 5rem" alt="cat"></b-card-img>
            <b-card-text>
                Nome: {{row.title}}
            </b-card-text>
            <b-card-text>
                {{row.authors ? (row.authors.length === 1 ? 'Autor' : 'Autores') : 'Sem Autor'}}: {{row.authors ? row.authors.join(', ') : ''}}, 
            </b-card-text> 
            <div slot="footer">
             <b-form-select v-on:change="updateBook(row)" v-model="selected" :options="actions.filter(action => action.shelfValue !== row.shelf)"></b-form-select>
            </div>
        </b-card>
    </b-card-group>
  </b-row>
  <h2><b-badge pill variant="primary">Quero Ler</b-badge></h2>
 <b-row align-v = "center" order-xl> 
    <b-card-group deck v-for="row in this.wantToRead" min-cols="3">
        <b-card
                style="width: 20rem; height: 18rem"
                class="mb-2"
                min-cols = "3">
            <b-card-img :src="`${row.imageLinks.smallThumbnail}`" style="width: 5rem; height: 5rem" alt="cat"></b-card-img>
            <b-card-text>
                Nome: {{row.title}}
            </b-card-text>
            <b-card-text>
                {{row.authors ? (row.authors.length === 1 ? 'Autor' : 'Autores') : 'Sem Autor'}}: {{row.authors ? row.authors.join(', ') : ''}}, 
            </b-card-text>          
            <div slot="footer">
             <b-form-select v-on:change="updateBook(row)" v-model="selected" :options="actions.filter(action => action.shelfValue !== row.shelf)"></b-form-select>
                
            </div>
        </b-card>
    </b-card-group>
  </b-row>
  <h2><b-badge pill variant="primary">Leitura Concluída</b-badge></h2>
 <b-row align-v = "center" order-xl> 
    <b-card-group deck v-for="row in this.read" min-cols="3">
        <b-card
                style="width: 20rem; height: 18rem"
                class="mb-2"
                min-cols = "3">
            <b-card-img :src="`${row.imageLinks.smallThumbnail}`" style="width: 5rem; height: 5rem" alt="cat"></b-card-img>
            <b-card-text>
                Nome: {{row.title}}
            </b-card-text>
            <b-card-text>
                {{row.authors ? (row.authors.length === 1 ? 'Autor' : 'Autores') : 'Sem Autor'}}: {{row.authors ? row.authors.join(', ') : ''}}, 
            </b-card-text> 
            <div slot="footer">
             <b-form-select v-on:change="updateBook(row)" v-model="selected" :options="actions.filter(action => action.shelfValue !== row.shelf)"></b-form-select>
            </div>
        </b-card>
    </b-card-group>
  </b-row>
 <b-row class="justify-content-md-right" order-xl> 
 <b-col cols="12">
    <img :src="imgPath" style="width: 10%" @click='redirect("Search")'/>
    </b-col>
  </b-row>
</b-container >
</template>

<script>
import { get, getAll, update} from '../API/BooksApi.js'

export default {
  created() {
    this.getBooks()
    this.getActions()
    this.imgPath = require('../../icon/search.png')
    
  },
  data: function() {
      return {
          bookList: [],
          currentlyReading: [],
          wantToRead: [],
          read: [],
          bookSearch: [],
          actions: [],
          selected: "",
          imgPath: ""
      }
  },
  methods: {
      getActions(){
        this.actions = [
                            { text: "Selecione uma opcao", value: "", action: "", shelfValue: "", value: ""},
                            { text: "Quero Ler", action: "WantRead()", shelfValue: "wantToRead" , value: "wantToRead"},
                            { text: "Leitura Concluida", action: "WantRead()", shelfValue: "read" , value: "read"},
                            { text: "Lendo Atualmente", action: "Reading()", shelfValue: "currentlyReading" , value: "currentlyReading"}
                         ]  
      },
      getBooks(){
          let teste = getAll()
          teste.then(res => {
             this.bookList = res
          })
      },
      redirect: function (page) {
        setTimeout(() => this.$router.push(`/${page}`), 100)
      },
      updateBook(book){
          if(this.selected !== "") {
            update(book, this.selected).then(res => {
                this.getBooks()
                this.selected=""
            })
          }
      }
  },
  watch: {
      bookList: function() {
          this.currentlyReading = this.bookList.filter(x => x.shelf === "currentlyReading")
          this.wantToRead = this.bookList.filter(x => x.shelf === "wantToRead")
          this.read = this.bookList.filter(x => x.shelf === "read")
      }
  },
}
</script>