# ToExcel

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Why 

I created this filter app in order to facilitate a recurrent task that was necessary in my past internship. 

We were asked each time to have an excel table with specific items of our database. So, I thought of creating this app to filter those specific item and have a table with the exact elements we needed.

For example, I made it possible to filter from a broad range of flags commonly used in our database. So, after filtering these values and flags the app allows you to export the new filtered table into an excel format by clicking on one button alone.

Here is a preview of what the app looks like with all the possible filters (those are all the flags we had inside our database):

![demo image](/src/assets/demo.png)

## How

I created most of the project using `Angular`, but the most important part in this project are all the functions created for each filter and option. 

There are many functions that I can't present but it is all available inside the code so feel free to look through it (it is there for a reason afterall).

First, I created many filter checkboxes in order to have all the filters set up. I assigned each checkbox with a function to it so that when the user clicks on it the function gets activated and filters the items.

```html
<div class="flagActif">     
  <strong>Flag Actif sous 1 : </strong> 
  <span>
    <span>O</span>
    <input (change)="chkOactif(1); search()" type="checkbox" [checked]="Oactif1">
    <span> - N</span>
    <input (change)="chkNactif(1); search()" type="checkbox" [checked]="Nactif1">
  </span>
</div>
```

For instance, in the code above I changed the checked values and each time a checkbox is being checked `seach` and `checkActif` are being called.

All filters work the same way, so the only thing that I had to add are items that are beeing filtered. 

```html
<tr *ngFor="let item of selected_names" id="item"> 
  <td>{{item.id_theme}}</td>
  <td>{{item.nom_theme}}</td>
  <td>{{item.flag_actif_categorie}}</td>
  
  [...]
  
  <td>{{item.flag_actif_sous_categorie_3}}</td>
  <td>{{item.flag_affichage_prod_sous_categorie_3}}</td>
  <td>{{item.nombre_articles_sou3}}</td>
</tr>
```

For this part I used a for loop that would go through all the `selected_names` that are being changed when a filter is being pressed. I also added the option to have them sorted and ordered only by clicking on the right table head.

Moving on, let me present some of the most interesting functions I coded. 

```typescript
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
```

This function is the most important and probably the most used one, since each time a filter is used this function is being called to actualize the new values on the list of elements.

Each time this function is called, all the flags are being checked and update the list of element according the filters, then return the list of all the names we have left from the list of elements, which are then used to being displayed on the table.

```typescript
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
  
[...]

}
```

This function is simple to understand since it just goes through all the flags and reports back what flags are checked and which aren't.

And finally, after realizing all these filters and passing all these pipes, the user can finally import the table into an excel table by clicking the button `import` that will call this function:

```typescript
//export filtered table to excel
exportexcel(): void {
  let element = document.getElementById('excel-table');
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  XLSX.writeFile(wb, this.fileName);
}
```

Which just changes the table's rows and columns into Excel rows and columns to have an identical table in Excel format.

>     this is the end of the documentation
