var dlgurl="";
var dlgtitle="";
function msgbox(spage,dltitle,width,height){
    dlgurl=spage;
    dlgtitle=dltitle;
    var sFeature='dialogWidth:'+width+'px;dialogheight:'+height+'px;center:yes;status:no;scroll:no;help:no;'
	return window.showModalDialog(webPath+"/cicpa/common/modaldialog.jsp",window,sFeature);
}
function msgbox_base(spage,dltitle,width,height){
    dlgurl=spage;
    dlgtitle=dltitle;
    var sFeature='dialogWidth:'+width+'px;dialogheight:'+height+'px;center:yes;status:no;scroll:no;help:no;'
	return window.showModalDialog(webPath+"/cicpa/common/modaldialog_base.jsp",window,sFeature);
}
function setColor(id){
	var oTable = document.getElementById(id);
	for(var i=1;i<oTable.rows.length;i++){
		if(i%2==0) oTable.rows[i].className='tabbak';
	}
}
/*************************************������ʼ********************************************/
/**
*��ȡ��������NUMλ��ЧС��
*@value �������
*@num С��λ
*@return ���ؽ�ȡ���ֵ(�������Ĳ��Ǹ������򷵻�ԭ��)
*/
function roundFloat(value,num){
	var vStr = value.toString();
	var reg = new RegExp("^(\\d+\\.\\d{"+num+"})\\d*$");
	if(reg.test(vStr)){
		var fV = vStr.replace(reg,"$1");
		return parseFloat(fV).toFixed(num);  
	} 
	return parseFloat(value);
}   
 
//��ҪҪ���еĲ����Ǽ����иߺ��п�ֻ��Ҫ���������table���п��� 
//�����Ƕ�׵����(Ƕ�ױ����и����ڲ����Ϊ��׼���п����Ե�һ�����Ϊ��׼) 
function exportExcel(tableid) {//������񿽱���EXCEL��   
	//���������  
	if(navigator.userAgent.indexOf("MSIE")<0){  
	    alert('����ie��������б�񵼳�');  
	    return;  
	}
	var curTbl = document.getElementById(tableid);   
	var oExcelApp = null;   
	//����ExcelӦ�ó������oExcelApp
	try {  
	    oExcelApp = GetObject("", "Excel.Application");  
	}  
	catch (E) {  
	    try {  
	        oExcelApp = new ActiveXObject("Excel.Application");  
	    }  
	    catch (E2) {  
	        alert("��ȷ���Ѿ�ִ�������²���:\n1.���ĵ����Ѿ���װMicrosoft Excel�������\n2.�������Internetѡ��=>��ȫ=>�Զ��弶�����Ѿ�����\"��������ActiveX�ؼ�\"��");  
	        return;  
	    }  
	}
	
	//����excel������   
	var oExcelBook = oExcelApp.Workbooks.Add();   
	 //��ȡworkbook����   
	var oSheet = oExcelBook.ActiveSheet;   
	      
	//�ڴ˽�����ʽ���� 
	var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var trows = curTbl.rows;
	    
	//�жϵ�һ����������Ƿ���Ƕ�ױ����������Ե�һ��Ƕ�ױ��Ϊ��׼(Ŀǰֻ�����������ֻ��һ����Ԫ������)
	if(trows.length > 0 && trows[0].cells.length >0){
		if(trows[0].cells[0].firstChild.nodeName=='TABLE' && trows[0].cells.length!=1){
			alert('������񲻷��Ϲ淶����ʱ�޷�����');
			return;
		}
		if(trows[0].cells[0].firstChild.nodeName=='TABLE'){
			var innerTab = trows[0].cells[0].firstChild;
			var inRows = innerTab.rows;
			var maxCellsIndex = 0;
			var maxColLength = 0;
			//���õ�һ���ڲ�����и�
			for(var i=0;i<inRows.length;i++){
				var cells = inRows[i].cells;
				if(cells.length > maxColLength){
					maxColLength = cells.length;
					maxCellsIndex = i;
				} 
				oSheet.Rows((i+1)+":"+(i+1)).RowHeight=roundFloat(inRows[i].clientHeight*3/4,2);
			}			
			//�����п�
			var maxCells = inRows[maxCellsIndex].cells;
			for(var j=0;j<maxCells.length;j++){
				oSheet.Columns(letters[j]+":"+letters[j]).ColumnWidth = roundFloat((maxCells[j].clientWidth/80)*10,2);
			}
			//������������и�
		}
		else{
			var maxCellsIndex = 0;
			var maxColLength = 0;
			//�����и�
			for(var i=0;i<trows.length;i++){
				var cells = trows[i].cells;
				if(cells.length > maxColLength){
					maxColLength = cells.length;
					maxCellsIndex = i;
				} 
				oSheet.Rows((i+1)+":"+(i+1)).RowHeight=roundFloat(trows[i].clientHeight*3/4,2);
			}
			//�����п�
			var maxCells = trows[maxCellsIndex].cells;
			for(var j=0;j<maxCells.length;j++){
				oSheet.Columns(letters[j]+":"+letters[j]).ColumnWidth = roundFloat((maxCells[j].clientWidth/80)*10,2);
			}			
		}
	}
	oSheet.Rows(1).HorizontalAlignment=3;     
	
	var sel = document.body.createTextRange(); //���ǰsheet   
	sel.moveToElementText(curTbl); //�ѱ���е������Ƶ�TextRange��  
	//sel.select();  //ȫѡTextRange������   
	sel.execCommand("Copy"); //����TextRange������   
	oSheet.Paste(); //ճ�������EXCEL��   
	oExcelApp.Visible = true; //����excel�ɼ�����  
	  
	oSheet.Application.Quit(); //������ǰ����  
	
	window.opener=null;  
	window.close(); //�رյ�ǰ����
}   
/*************************************��������********************************************/