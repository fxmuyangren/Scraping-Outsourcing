
var dlgurl="";
var dlgtitle="";
function msgbox(spage,dltitle,width,height){
    dlgurl=spage;
    dlgtitle=dltitle;
    var sFeature='dialogWidth:'+width+'px;dialogheight:'+height+'px;center:yes;status:no;scroll:no;help:no;'
	return window.showModalDialog(webPath+"/common/modaldialog.jsp",window,sFeature);
}
function msgbox2(spage,dltitle,sFeature){
    dlgurl=spage;
    dlgtitle=dltitle;
    var sFeature=sFeature;
	return window.showModalDialog(webPath+"/common/modaldialog.jsp",window,sFeature);
}

function getPosition(element){  
	var posAry=new Array();
	var t=element.offsetTop;  var l=element.offsetLeft;  

	while(element=element.offsetParent){  
   		t+=element.offsetTop;  l+=element.offsetLeft;  
	} 
 	posAry[0]=l;
 	posAry[1]=t;
 	return posAry;
}

//document.getElementById()�Ŀ��д��
//����ΪԪ��id
function $() {
  var elements = new Array();
  for (var i = 0; i < arguments.length; i++) {
    var element = arguments[i];
    if (typeof element == 'string')
      element = document.getElementById(element);
    if (arguments.length == 1)
      return element;
    elements.push(element);
  }
  return elements;
}
/*****************************************CCP��վ�泣�÷�������***********************************************************/

/* ����Ƿ�Ϊ�ʼ���ַ */
function isEmail(value) {
	if (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g.test(value)) {
		return true;
	}
	return false;
}
/** ���¼��ֵ�Ƿ�Ϊ������ */
function isPositiveInteger(value){
	if(/^[0-9]*[1-9][0-9]*$/.test(value)){
		return true;
	}
	return false;
}



/* ��������Ƿ�Ϸ�������20080230���Ǵ���ģ������ڸ�����*/
function isDate(year,month,day) {
	var t=new Date(year,month-1,day);
	year = year.substring(2,4);
	if(year != t.getYear() || month != t.getMonth()+1 || day != t.getDate())
     	  return false;
	return true;
}

//trim������ΪString��������ԣ�����ַ�������ո�
String.prototype.trim = function(){return this.replace(/(^\s*)|(\s*$)/g,'')}

//len������ΪString��������ԣ������ַ�������
String.prototype.len = function(){return this.replace(/[^\x00-\xff]/g,'aa').length;}

/* ˢ����֤�� */
function freshImg(obj) {
  var date = new Date();
  document.getElementById(obj).src = date.toString()+".check";
}

//�ж��Ƿ�Ϊ���� true������
function isChinese(s){   
  var ret=true;   
  for(var i=0;i<s.length;i++)   
    ret=ret && (s.charCodeAt(i)>=10000);   
  return ret;   
}

//�ж��ֻ����� 11λ
function phoneCheck(str) {
	if(str.len()!=11) return false;
	if(/^[0-9]*[1-9][0-9]*$/.test(str)){
		return true;
	}
	return false;
	//var regu = /^[1][3][0-9]{9}$/;
	//var regu1 = /^[1][5][8][0-9]{8}$/;
	//var regu2 = /^[1][5][0][0-9]{8}$/;
	//var re = new RegExp(regu);
	//var re1 = new RegExp(regu1);
	//var re2 = new RegExp(regu2);
	//if (re.test(str) || re1.test(str) || re2.test(str) ) {
	//	return true;
	//}
	//return false;
}

/*���ݲ�����ļ��ϴ�ʱ������ô˺������input,TEXTAREA������*/
function isdanger(inputObj){
	if(inputObj==null||(inputObj.tagName!="INPUT"&&inputObj.tagName!="TEXTAREA")){
		return false;
	}
	if(inputObj.value==null)
		return false;
	/*��������*/
	var objRegXSS = />|<|,|\[|\]|\{|\}|\?|\/|\+|=|\||\'|\\|\"|:|;|\~|\!|\#|\*|\%|\^|\&|script|object|applet|`/i;
	var objRegFilePath = /^.*(��)|(jsp).*$/gi;
	var objRegFileName = /^\.*.(jpg)|(jpeg)|(doc)|(excel)|(docx)$/gi;
	var	re= /^insert|select|truncate|update|delete|and|or|drop|exec|net|count|:|'|"|=|;|>|<|%$/; 
	/*����ֵ*/
	if(inputObj.type=="file"){
		return objRegFilePath.test(inputObj.value.toLowerCase())||!objRegFileName.test(inputObj.value.toLowerCase());
	}else
	   /* ��ֹsqlע���jsע�� */
  	   return re.test(inputObj.value.toLowerCase())||objRegXSS.test(inputObj.value.toLowerCase());
}

/**
*	��������������ƣ����������ʣ�������򳬳�����,����ָ��λ����ʾ������Ϣ
*	fieldObj:��������	
*	describeObj:������Ϣ(ʣ�������򳬳�����)��ʾ����
*	numInfoObj:������Ϣ��ʾ����
*	maxNum:������������	
*/
function textCounter(fieldObj,describeObj,numInfoObj,maxNum){
	try{
		var leave = maxNum - checkLength(fieldObj.value);
		if(leave>=0){
			numInfoObj.innerHTML = leave;
			describeObj.innerHTML = "ʣ������:";
		}else{
			numInfoObj.innerHTML = -leave;
			describeObj.innerHTML = "��������:";
		}
	}catch(e){
		return;
	}
}

/**
  * Description  :�жϲ����ַ������ֽڳ��ȣ�һ������ռ�����ֽ�
  * Parameters  :strTemp�������ַ���
  * Return   :num
  */
function checkLength(strTemp)
{
 var i,sum;
 sum=0;
 for(i=0;i<strTemp.length;i++)
 {
  if ((strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255))
   sum=sum+1;
  else
   sum=sum+2;
 }
 return sum;
}
//ȡ��ѡ��ѡ�а�ť��ֵ
function getRbGroupValue(rbGroup){
	for(var k=0;k<rbGroup.length;k++){
		if(rbGroup[k].checked) return rbGroup[k].value;
	}
	return null;
}
//���õ�ѡ��ť��ѡ��
function setRbGroupChecked(grpName,value){
	var arr = document.getElementsByName(grpName);
	for(var i=0;i<arr.length;i++){
		if(arr[i].value == value){
			arr[i].checked = true;
			return;
		}
	}
}