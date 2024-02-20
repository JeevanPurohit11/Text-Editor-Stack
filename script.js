import {stack}  from './stack.js'
//0 means : insert element 
//1 meand : deleting the element;


//use basically for not to cut ,paste functionalty on our texxt editor that no one can do back and insert element in between rather than to insert at last .
document.onkeydown=function(event){
    if(event.ctrlKey || event.metaKey){
        event.preventDefault();
    }
};

onload=function(){
     //get reference to element
     const textbox=document.getElementById('comment');
     const undo=document.getElementById('undo');
     const clear=document.getElementById('clear');
     const temptext=document.getElementById('temptext');
     
     textbox.value="";
     let text="";
     let stack= new stack();
 
     textbox.onclick=function(){
        textbox.selectionStart  =textbox.selectionEnd =textbox.value.length;

     };

     clear.onclick=function(){
        stack.clear();
        text="";
        textbox.value="";
        temptext.innerHTML="All operation are shown here sequencelly.."
     }

     text.oninput=function(event){
        switch(event.inputType){
            case "insertElement":
                stack.push(0,event.data);
                break;
            case "deleteElementFromBack":
                //we are not using event.pop() directly because here the pop element cannot be known ,as we can see the push element ,therefore we show rest elemet ,so we can easily find which element is pop;
                stack.pop(1,text[text.length-1]);  
                break; 
        }
        temptext.innerHTML="Element on the Top of stack is : "+stack.top()+"<br><br>"+temptext.innerHTML;
        text=textbox.value;
     }

     //undo operation
    undo.onclick=function(){
        let operation =stack.pop();
        if(operation[0]!==-1){
        temptext.innerHTML = "Performing undo operation on our input stack <br>"+ temptext.innerHTML;
            if(operation[0] === 0){
                let len = operation[1].length;
                textbox.value = textbox.value.substring(0,textbox.value.length-len);
            } else{
                textbox.value += operation[1];
            }
            text = textbox.value;
        }
    };
};