//千分法
function paddingNum(inputNum){
    let flag = inputNum > 0 ? true : false;
    let numArr = Math.abs(inputNum).toString().split('.');
    let right = numArr[1] ? '.'+numArr[1] : '';
    let left = numArr[0];
    let temp = '';
    while(left.length > 3){
        temp = ',' + left.slice(-3) + temp;
        left = left.slice(0,left.length-3);
    }
    return flag? left+temp + right : '-'+left+temp+right;
}
