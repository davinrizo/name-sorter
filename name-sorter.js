const express = require('express');
const arrayToTxtFile = require('array-to-txt-file');

const app = express();
const fs = require('fs');
const names = fs.readFileSync('unsorted-names-list.txt').toString().split("\n");

sorting = (x) =>{
  //make a new array to put the sorted names list.
  var newarr = [];
  
  //reverse the names to start from the last names
  for(var i = 0; i <  x.length; i++){
	newarr[i] = x[i].split(" ").reverse().join(" ");
  }

  //sort the new array of names to last names.
  newarr.sort();

  //put back the names to its original state.
  //First name, last name.
  for(var i = 0; i < newarr.length; i++){
	newarr[i] = newarr[i].split(" ").reverse().join(" ");
  }

  //erase the empty string in the array.
  newarr.shift();
  
  return(newarr);

};

const sortedList = sorting(names);
const sortedListForBrowser = sortedList.toString().split(',').join("<br>")
const sortedListForTxt = sortedList.toString().split(',').join("\n")

arrayToTxtFile(['Sorted list:', sortedListForTxt], './sorted-names-list.txt', err => {
    if(err) {
      console.error(err)
      return
    }
    console.log('Successfully wrote to txt file')
})

app.get('/', (req,res ) =>{
    res.send(sortedListForBrowser);
})

app.listen(5000);