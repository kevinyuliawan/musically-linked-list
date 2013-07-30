/* 
    A class to construct a linked list out of the 12 music notes on the piano 
  
    DoublyLinkedList code from:
    https://github.com/nzakas/computer-science-in-javascript/blob/master/data-structures/doubly-linked-list/doubly-linked-list.js 
    Custom edited to take a Note which already has .next and .prev properties built in 
*/

function DoublyLinkedList(){this._head=null;this._tail=null;this._length=0}DoublyLinkedList.prototype={constructor:DoublyLinkedList,add:function(noteObject){var node=noteObject;if(this._length==0){this._head=node;this._tail=node}else{this._tail.next=node;this._head.prev=node;node.prev=this._tail;node.next=this._head;this._tail=node}this._length++},item:function(index){if(index>-1&&index<this._length){var current=this._head,i=0;while(i++<index){current=current.next}return current.data}else{return null}},remove:function(index){if(index>-1&&index<this._length){var current=this._head,i=0;if(index===0){this._head=current.next;if(!this._head){this._tail=null}else{this._head.prev=null}}else if(index===this._length-1){current=this._tail;this._tail=current.prev;this._tail.next=null}else{while(i++<index){current=current.next}current.prev.next=current.next}this._length--;return current.data}else{return null}},size:function(){return this._length},toArray:function(){var result=[],current=this._head,end=this._tail;while(current){result.push(current);if(current===end)break;current=current.next}return result},toString:function(){return this.toArray().toString()},note:function(note){note=note.toString();note=note[0].toUpperCase()+note.substring(1);var current=this._head,end=this._tail;while(current){if(current.names.natural==note||current.names.sharp==note||current.names.flat==note){return current;break}if(current===end){return false;break}current=current.next}}};


// establishing the Note object/class
var Note = function(natural, sharp, flat, zerofrequency, color){
    this.names = {
      natural: natural,
      sharp: sharp,
      flat: flat
    }
  , this.color = color
  , this.next  = null
  , this.prev  = null
  , this.zerofrequency = zerofrequency
    // Begin getter functions
  , this.frequency = function(want){ if(!want) want=0; return zerofrequency * Math.pow(2,want) } // e.g. frequency of A4 = 440
  , this.getHalf = function(want) { //return the note x half-steps away
        var result = this;
        for(var i=1;i<=want;i++){
          result = result.half();
        }
        return result;
      }
  , this.getWhole = function(want){ //return the note x whole steps away
        var result = this;
        for(var i=1;i<=want;i++){
          result = result.whole();
        }
        return result;
      }
  , this.half  = function(){ return this.next      }
  , this.whole = function(){ return this.next.next }
  , this.name = function(want){
        // user-specified name, if they want it in sharps or flats, or nothing which defaults to natural then sharps (sorry about the sharp-bias) then flats
        if(want){
          switch(want){
            case('sharp'):
            case('sharps'):
            case('#'):
              if(this.names.sharp) { return this.names.sharp; } 
              else { return this.names.natural };
              break;
            case('flat'):
            case('flats'):
            case('b'):
              if(this.names.flat) { return this.names.flat; }
              else { return this.names.natural };
              break;
        }}
        else{
          if (this.names.natural) return this.names.natural;
          else if (this.names.sharp) return this.names.sharp;
          else return this.names.flat;
        }}
};

var musicList = new DoublyLinkedList();

/* 
 *  List of notes: 
 *  new Note(natural, sharp, flat, zerofrequency) 
 */
var one    = new Note( 'C'  , 'B#' , null , 16.35 , 'white');
var two    = new Note( null , 'C#' , 'Db' , 17.32 , 'black');
var three  = new Note( 'D'  , null , null , 18.35 , 'white');
var four   = new Note( null , 'D#' , 'Eb' , 19.45 , 'black');
var five   = new Note( 'E'  , null , 'Fb' , 20.60 , 'white');
var six    = new Note( 'F'  , 'E#' , null , 21.83 , 'white');
var seven  = new Note( null , 'F#' , 'Gb' , 23.12 , 'black');
var eight  = new Note( 'G'  , null , null , 24.50 , 'white');
var nine   = new Note( null , 'G#' , 'Ab' , 25.96 , 'black');
var ten    = new Note( 'A'  , null , null , 27.50 , 'white');
var eleven = new Note( null , 'A#' , 'Bb' , 29.14 , 'black');
var twelve = new Note( 'B'  , null , 'Cb' , 30.87 , 'white');




// loop to add all 12 notes
for(var i=1;i<=12;i++){
  switch(i){
      case(1):
        musicList.add(one);
        break;
      case(2):
        musicList.add(two);
        break;
      case(3):
        musicList.add(three);
        break;
      case(4):
        musicList.add(four);
        break;
      case(5):
        musicList.add(five);
        break;
      case(6):
        musicList.add(six);
        break;
      case(7):
        musicList.add(seven);
        break;
      case(8):
        musicList.add(eight);
        break;
      case(9):
        musicList.add(nine);
        break;
      case(10):
        musicList.add(ten);
        break;
      case(11):
        musicList.add(eleven);
        break;
      case(12):
        musicList.add(twelve);
        break;
  };
};



var musicArray = musicList.toArray();

console.log(musicArray[1].names);

/*
for(var i=0;i<2;i++){
  var cur = musicArray[i];
  console.log('\nNote ' + [i] + ':');
  console.log(cur.name());
  console.log('\nThe frequency: ');
  console.log(cur.frequency(2));
  console.log('\nAfter it:');
  console.log(cur.next.name());
  console.log('\nBefore it:');
  console.log(cur.prev.name());
  console.log('\nThree half-steps away:');
  console.log(cur.getHalf(3).name());
  console.log('\n --------------');
}
*/

function getMajor(rootnote){
  var results = [];
  var root = musicList.note(rootnote);
  var third = root.getWhole(2);
  var fifth = root.getWhole(3).half();
  results.push(root.name());
  results.push(third.name('sharp'));
  results.push(fifth.name());
  return results;
}

console.log(getMajor('F'));

/* 
  Can use this page on intervals for reference:
  http://en.wikipedia.org/wiki/Interval_(music)#Main_intervals
*/

function getMajorScale(rootnote){
  var root = musicList.note(rootnote);
  var second = root.whole();
  var third = second.whole();
  var fourth = third.half();
  var fifth = fourth.whole();
  var sixth = fifth.whole();
  var seventh = sixth.whole();
  var eighth = seventh.half();
  var results = [root.name(), second.name(), third.name(), fourth.name(), fifth.name(), sixth.name(), seventh.name(), eighth.name()];
  return results;
}
console.log(getMajorScale('D'));

// takes the root note and w, h, t, s, 2, 1, whole, half, tone, semitone which should translate to getHalf(1) or getHalf(2)
function defineScaleRelative(rootnote, args){
  var results = [];
  var root = musicList.note(rootnote);
  results.push(root);
  // go through the arguments and push to the array the resulting note. the first argument will be the root note
  for (var i=1;i<arguments.length;i++){
    /* if(i===1){ results.push(root.getHalf(arguments[i])) }  // not needed if we push the root note first */
    results.push(results[i-1].getHalf(arguments[i])) // the next note is relative to the one before it
  };
  // switch the results to use the names
  for (var i=0;i<results.length;i++){
    results[i] = results[i].name();
  }
  return results;
}
console.log('The C major scale:\n' + defineScaleRelative('C',2,2,1,2,2,2,1));
console.log('The A minor (the relative minor of C) scale:\n' + defineScaleRelative('A',2,1,2,2,1,2,2));
console.log('The C minor scale:\n' + defineScaleRelative('C',2,1,2,2,1,2,2));

// takes the numbers and generates the notes relative absolutely to the root in semitones (12 notes in total incl octave)
function defineScaleAbsolute(rootnote, args){
  var results = [];
  var root = musicList.note(rootnote);
  for(var i=1;i<arguments.length;i++){
    results.push(root.getHalf(arguments[i]))
  };
  for(var i=0;i<results.length;i++){
    results[i] = results[i].name();
  }
  return results;
}
console.log('C major using absolute intervals:\n' + defineScaleAbsolute('A',0,2,4,5,7,9,11,12));


// TODO: add a default option for sharps or flats that the user can change so that all the .name() functions follow that default setting
// Scale objects constructed by specifying absolute and relative intervals
// Interval objects where they have name: major third, absolute: 4, relative: depends on context? or maybe a relative scale can be translated into absolute

module.exports = musicList;

