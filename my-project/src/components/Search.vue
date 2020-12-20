<template>
<b-container >
 <b-row align-v = "center" order-xl> 
    <img :src="require('../../icon/back.png')" style="width: 3%" @click='redirect("")'/>
    <h4>Buscar Livros: </h4>
     <b-form-input v-model="bookSearch" placeholder="Escreva o nome do livro" style="width: 70%"></b-form-input>
     <br>
 </b-row>
 

 <b-row class="my-1">
    <b-col sm="12" align-v="center">
        <b-alert v-model="alert" variant="primary"><a href="#" class="alert-link">{{this.alertText}}</a></b-alert>
    </b-col>
  </b-row>
 <b-row align-v = "center" order-xl> 
    <b-card-group deck v-for="row in this.bookList" min-cols="3">
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

</b-container >
</template>

<script>
import { get, getAll, update, search} from '../API/BooksApi.js'

export default {
  created() {
    this.getBooks()
    this.getActions()
  },
  data: function() {
      return {
          read: [],
          bookSearch: '',
          bookList: [],
          actions: [],
          selected: "",
          alert: 'hidden',
          alertText: ''
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
      searchBook(){
          let query = this.bookSearch
          let response=[]
          search(query).then(res => {
              if(res.error) {
                this.alert = "show"
                this.alertText = "Nao foram encontrados livros com base na sua pesquisa."
              } else {
                this.bookList = res
                this.alert = "hidden"
                this.alertText = ""
              }
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
      bookSearch: function(){
          if(this.bookSearch.length > 3) {
              this.searchBook() 
         }
          else if(this.bookSearch == '') {
                this.alert = "show"
                this.alertText = "Consultando todos os livros sem filtro" 
                this.getBooks()
            }
      }
  },
}
</script>