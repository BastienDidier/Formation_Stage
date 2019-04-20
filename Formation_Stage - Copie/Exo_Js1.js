var a = [5, "34", 12, 0, "8", "abc", 2];
var c=a.filter(function(elt){
    return !isNaN(elt);
}).sort(function(pred,suiv){
    return suiv-pred;
});
console.log(c);
var a = [1, 2, 3, 4, 4, 5, 5, 6];
var res=[];
res=a.filter(function(elt){
    if(res.indexOf(elt)==-1){
        console.log("here");
        res.push(elt);
        return true;
    }
    // a.splice(a.indexOf(elt));
});
// res=res.sort();
console.log("exo 2 \n");
console.log(res);

var sg = ["bonjour", "monsieur", "john", "doe"];
var phrase=sg.join(" ");
var cop=[];
sg.forEach(function(words){
    words=words.replace(words.substr(0,1),words.substr(0,1).toUpperCase());
    words=words.replace(words.substr(words.length-1,words.length-1),words.substr(words.length-1,words.length-1).toUpperCase());
    cop.push(words);
});
console.log(sg+" la");
console.log(cop);
sg=cop.join(" ");
console.log("exo 3\n");
console.log(sg);


 a = [1,2,3,4,5,6,7,8];
 b = [3,4,7];
 c = [1,4,3,4,7,8];

var somme=0;
somme=a.reduce(function(tot,elt){
    if(b.indexOf(elt)==-1&&c.indexOf(elt)!=-1){
        tot+=elt;
    }
    return tot;
},0);
console.log("exo 4 \n");
console.log(somme)