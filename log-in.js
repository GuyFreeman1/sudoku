function validate() {
    let userName = document.getElementById("username").value;
    let passWord = document.getElementById("password").value;
    if (userName == 'abcd' && passWord == '1234') {
        window.location.href = "sudoku.html";
    }

    if (userName !== 'abcd') { // check if the username is wrong) {
        document.getElementById('un-error').innerHTML = 'WRONG USERNAME !'; // will return an error via innerHTML if the username is Not 'abcd'
    }
    if (userName == '') { // check if the username is empty
        document.getElementById('un-error').innerHTML = 'USERNAME CANNOT BE EMPTY !'; // will return an error via innerHTML if the username input is empty
    }
    if (passWord !== '1234') {// check if the Password is wrong
        document.getElementById('pw-error').innerHTML = 'WRONG PASSWORD !'; // will return an error via innerHTMLif the Password is Not '1234'
    }
    if (passWord == '') { // check if the Password is empty
        document.getElementById('pw-error').innerHTML = 'PASSWORD CANNOT BE EMPTY !';// will return an error via innerHTML if the Password input is empty
    }


}