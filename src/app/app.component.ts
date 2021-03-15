import { Component, VERSION } from '@angular/core';
import * as XLSX from 'xlsx';
import { FilterService } from './service/filter/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fileName = 'ExcelSheet.xlsx'; //excel file name

  //List of all elements
  userList = [];

  //filter variables
  searchText: string = "";      //search box
  selectedOption: string = "";  //'select' option

  Oaff = true;              //checkboxes 
  Naff = true;
  Oactif = true;              
  Nactif = true;
  
  Oaff1 = true;              
  Naff1 = true;
  Oactif1 = true;              
  Nactif1 = true;
  
  Oaff2 = true;              
  Naff2 = true;
  Oactif2 = true;              
  Nactif2 = true;
  
  Oaff3 = true;              
  Naff3 = true;
  Oactif3 = true;              
  Nactif3 = true;

  Otend = true;              
  Ntend = true;

  selected_count: number = 0;   //nbr of selected items
  selected_names = [];          //selected items
  listLength = 0;

  Ordre = true;  //ordre
  idOrder = true;
  idParOrder = true;
  typeOrder = true;
  ordreTendOrder = true;
  tendOrder = true;
  affOrder = true;
  actifOrder = true;
  nbrOrder = true;
  nameOrder = true;

  maxVisite = 0;

  ordreList = [];
  
  //select options
  options = [
    { name: "", value: 0 },
    { name: "THEM", value: 1 },
    { name: "SOU1", value: 2 },
    { name: "SOU2", value: 3 }
  ]

  constructor(service: FilterService) {
    service.getAllData().subscribe(data => {
      this.userList = data;
      this.selected_names = this.userList;
      /*this.userList.forEach( item => {
        if(item.nombre_visite > this.maxVisite)
          this.maxVisite = item.nombre_visite;

        if(!this.ordreList.includes(item.ordre_theme)){ 
          this.ordreList.push(item.ordre_theme);
        }
        this.ordreList.sort(function(a,b){
          return a-b;
        });
      });*/
    });
  }

  //search from options
  search() {
    this.checkFlags();
    this.selected_names = this.selected_names.filter(s => {
      if (s.type_theme === this.selectedOption) {
        return s;
      }
    });
    if (this.selectedOption === "") 
    {
      this.selected_names = this.userList;  //default option
      this.checkFlags();
    }
    this.selected_names = this.selected_names.filter(s => {
      if(s.nom_theme.toLowerCase().includes(this.searchText)){
        return s;
      }
    }
    )

    this.selected_count = this.selected_names.length;
  }

  sortInt(number, name){
    if(name === 'nombre_articles')
    {
      var theme;
      if(number>0){
        theme = "_sou"+number;
      }
      else
        theme = "";
    }
    else if(name === 'id')
    {
      if(number>0){
        theme = "_sous_theme_"+number;
      }
      else
        theme = "_theme";
    }
    if(this.idOrder){
      this.idOrder = false;
      this.selected_names.sort(function(a,b){
        return eval("a."+name+theme)-eval("b."+name+theme);
      })
    }
    else{
      this.idOrder = true;
      this.selected_names.sort(function(a,b){
        return eval("b."+name+theme)-eval("a."+name+theme);
      })
    }
  }

  sortString(number, name){
    var theme;
    if(name === 'nom')
    {
      if(number>0){
        theme = "sous_theme_"+number;
      }
      else
        theme = "theme";
    }
    else{
      if(number>0){
        theme = "sous_categorie_"+number;
      }
      else
        theme = "categorie";
    }

    if(this.nameOrder){
      this.nameOrder = false;
      this.selected_names.sort(function(a,b){
        if(!eval("b."+name+"_"+theme))
          return -1;
      })
      this.selected_names.sort(function(a,b){
        if(eval("a."+name+"_"+theme) && eval("b."+name+"_"+theme))
          return eval("a."+name+"_"+theme).localeCompare(eval("b."+name+"_"+theme));
      })
    }
    else{ //flag_actif
      this.nameOrder = true;
      this.selected_names.sort(function(a,b){
        if(!eval("a."+name+"_"+theme))
          return -1;
      })
      this.selected_names.sort(function(a,b){
        if(eval("b."+name+"_"+theme) && eval("a."+name+"_"+theme))
          return eval("b."+name+"_"+theme).localeCompare(eval("a."+name+"_"+theme)) ;
      })
    }
  }

  //check O or N
  checkFlags(){
    this.selected_names = this.userList.filter(s => {  // theme 
      if (this.Oaff && s.flag_affichage_prod_categorie === "O")
        return s;
      if (this.Naff && s.flag_affichage_prod_categorie === "N")
        return s;});
    this.selected_names = this.selected_names.filter(s => {
      if (this.Oactif && s.flag_actif_categorie === "O")
       return s;
      if (this.Nactif && s.flag_actif_categorie === "N")
       return s;
    });

    this.selected_names = this.selected_names.filter(s => {  //sous theme 1
      if (this.Oaff1 && s.flag_affichage_prod_sous_categorie_1 === "O")
        return s;
      if (this.Naff1 && s.flag_affichage_prod_sous_categorie_1 === "N")
        return s;});
    this.selected_names = this.selected_names.filter(s => {
      if (this.Oactif1 && s.flag_actif_sous_categorie_1 === "O")
       return s;
      if (this.Nactif1 && s.flag_actif_sous_categorie_1 === "N")
       return s;
    });

    this.selected_names = this.selected_names.filter(s => {   //sous theme 2
      if(!s.flag_affichage_prod_sous_categorie_2)
        return s;
      if (this.Oaff2 && s.flag_affichage_prod_sous_categorie_2 === "O")
        return s;
      if (this.Naff2 && s.flag_affichage_prod_sous_categorie_2 === "N")
        return s;});
    this.selected_names = this.selected_names.filter(s => {
      if(!s.flag_actif_sous_categorie_2)
        return s;
      if (this.Oactif2 && s.flag_actif_sous_categorie_2 === "O")
       return s;
      if (this.Nactif2 && s.flag_actif_sous_categorie_2 === "N")
       return s;
    });
    
    this.selected_names = this.selected_names.filter(s => {   //sous theme 3
      if(!s.flag_affichage_prod_sous_categorie_3)
        return s;
      if (this.Oaff3 && s.flag_affichage_prod_sous_categorie_3 === "O")
        return s;
      if (this.Naff3 && s.flag_affichage_prod_sous_categorie_3 === "N")
        return s;});
    this.selected_names = this.selected_names.filter(s => {
      if(!s.flag_actif_sous_categorie_3)
        return s;
      if (this.Oactif3 && s.flag_actif_sous_categorie_3 === "O")
       return s;
      if (this.Nactif3 && s.flag_actif_sous_categorie_3 === "N")
       return s;
    });
    /*this.selected_names = this.selected_names.filter(s => {
      if (this.Otend && s.flag_tendance === "O")
        return s;
      if (this.Ntend && s.flag_tendance === "N")
        return s;
    });  */
  }

  //check what checkboxes are checked
  chkedFlag() {
    this.search();
    this.selected_count = this.selected_names.length;
  }

  //check O aff
  chkOaff(number) {
    switch(number)
    {
      case 0: this.Oaff = !this.Oaff;
        break;
      case 1: this.Oaff1 = !this.Oaff1;
        break;
      case 2: this.Oaff2 = !this.Oaff2;
        break;
      case 3: this.Oaff3 = !this.Oaff3;
    }
  }

  //check N aff
  chkNaff(number) {
    switch(number)
    {
      case 0: this.Naff = !this.Naff;
        break;
      case 1: this.Naff1 = !this.Naff1;
        break;
      case 2: this.Naff2 = !this.Naff2;
        break;
      case 3: this.Naff3 = !this.Naff3;
    }
  }

  //check O actif
  chkOactif(number) {
    switch(number)
    {
      case 0: this.Oactif = !this.Oactif;
        break;
      case 1: this.Oactif1 = !this.Oactif1;
        break;
      case 2: this.Oactif2 = !this.Oactif2;
        break;
      case 3: this.Oactif3 = !this.Oactif3;
    }
  }

  //check N actif
  chkNactif(number) {
    switch(number)
    {
      case 0: this.Nactif = !this.Nactif;
        break;
      case 1: this.Nactif1 = !this.Nactif1;
        break;
      case 2: this.Nactif2 = !this.Nactif2;
        break;
      case 3: this.Nactif3 = !this.Nactif3;
    }
  }

  //clear all options
  clear(){
    this.selectedOption = "";
    this.searchText = "";
    this.Oaff = true;              //checkboxes 
    this.Naff = true;
    this.Oactif = true;              
    this.Nactif = true; 

    this.Oaff1 = true;              
    this.Naff1 = true;
    this.Oactif1 = true;              
    this.Nactif1 = true;

    this.Oaff2 = true;              
    this.Naff2 = true;
    this.Oactif2 = true;              
    this.Nactif2 = true;

    this.Oaff3 = true;              
    this.Naff3 = true;
    this.Oactif3 = true;              
    this.Nactif3 = true;

    this.search();
  }

  //export filtered table to excel
  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);

  }
}

