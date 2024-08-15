---
title: คู่มือการพัฒนาเพื่อใช้งาน e-Payment ธนาคารกรุงไทย
weight: 20
date: 2024-03-07T08:42:28.098Z
---
### ขั้นตอนการพัฒนา

1. ลงทะเบียนใช้งาน API กับ สพร. โดย สพร จะส่ง Consumer-Key และข้อมูลสำหรับทดสอบการเรียก API ให้หน่วยงาน
2. ทดสอบและพัฒนาระบบ โดยเรียก API

   * API ขอ Token
   * API สร้าง Payment Transaction
   * API ปิด Payment Transaction
   * API Void Payment  (เฉพาะช่องทาง Fastpay)
   * API ตรวจสอบสถานะการชำระเงิน
   * API รับสถานะตอบกลับการชำระเงิน (Callback Status)

### 2 API ขอ Token

การเรียกใช้งานข้อมูลผ่าน Government API มี 2 ขั้นตอน ตัวอย่าง Source Code ดังนี้ \[คลิกเพื่อดูรายละเอียด] 

| API    | https://api.egov.go.th/ws/auth/validate |
| ------ | --------------------------------------- |
| Method | GET                                     |

Query String

```http
?ConsumerSecret={{String}}&AgentID={{String}}
```

Query String Parameters

| รายการข้อมูล   | รายละเอียด                                                                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ConsumerSecret | เช่น ConsumerSecret=xxxxxxxxxxxxxx                                                                                                                          |
| AgentID        | เลขประจำตัวประชาชน 13 หลัก เช่น AgentID=1234567890123 <br />กรณีเรียก API Personal Signing ต้องกำหนด AgentID เป็นเลขประจำตัวประชาชนของผู้เซ็นเอกสารเท่านั้น |

Request Header

| รายการข้อมูล | รายละเอียด                                                                  |
| ------------ | --------------------------------------------------------------------------- |
| Consumer-Key | Consumer-Key ที่ได้ลงทะเบียนกับ สพร. (ระบบส่งให้ทาง e-Mail ที่ลงทะเบียนไว้) |

Response

```json
{
    "Result": "8e1ac089-0000-aaaa-0000-403c0c9ab867"
}
```

Response Parameters

| รายการข้อมูล | รายละเอียด                                                                  |
| ------------ | --------------------------------------------------------------------------- |
| Result | Token String สำหรับใช้ในการเรียก API ต่างๆ<br />(กรณีขอ Token ไม่สำเร็จ หรือ error อื่นๆ ให้ทำการเรียก API ใหม่อีกครั้ง จนกว่าจะได้ Token ไปใช้เรียกเรียกร่วมกับ API อื่นๆ) |

ตัวอย่างการเรียกใช้งาน

```json
Request

[GET] https://api.egov.go.th/ws/auth/validate?ConsumerSecret={{secret}}&AgentID=1234567890123

Content-Type: application/json

Consumer-Key: {{consumerKey}}

Response

{

    "result": "8e1ac089-0000-aaaa-0000-403c0c9ab867"

}
```

### 3 API สร้าง Payment Transaction

| API [Production] | https://api.egov.go.th/ws/dga/payment/create | 
| -- | -- |
| API [UAT] | https://api.egov.go.th/ws/dga/uat/payment/create |
| API [Test] | https://api.egov.go.th/ws/dga/dev/payment/create |
| Method | POST |

Request Header

| รายการข้อมูล | รายละเอียด |
| -- | -- |
| Consumer-Key | Consumer-Key ที่ได้ลงทะเบียนกับ สพร. (ระบบส่งให้ทาง e-Mail ที่ลงทะเบียนไว้) |
| Token | Token String ที่ได้จากการ API ขอ Token |
| Content-Type | กำหนดค่าดังนี้ : application/json | 

Request Body

```json
{
  "customerID": "String", 
  "customerTitleName": "String", 
  "customerFirstName": "String", 
  "customerMiddleName": "String",
  "customerLastName": "String", 
  "bankCode": "BankCodeEnum",
  "paymentType": "PaymentTypeEnum", 
  "amount": "Decimal", 
  "requestReference1": "String", 
  "requestReference2": "String", 
  "requestReference3": "String", 
  "source": "String" 
  "data" : "Object" 
}
```

Request Body Parameters

| รายการข้อมูล | รายละเอียด |
| -- | -- |
| CustomerID | เลขบัตรประชาชน, นิติบุคคล, HN, หรือเลขอื่นๆที่ใช้สำหรับระบุตัวตนของผู้ทำการชำระเงิน | Required |
| CustomerTitleName | คำนำหน้าชื่อ เช่น นาย, นาง, นางสาว เป็นต้น | Required |
| CustomerFirstName | ชื่อ | Required |
| CustomerMiddleName | ชื่อกลาง (ถ้ามี) | |
| CustomerLastName | นามสกุล | Required |
| BankCode | รหัสธนาคาร ในกรณีนี้กำหนดเป็น KTB เสมอ | Required |
| PaymentType | ช่องทางการชำระเงิน FastPay หรือ QRPayment | Required |
| Amount | ยอดชำระ เช่น 1000 | Required |
| RequestReference1 | รหัสอ้างอิงการชำระเงินของระบบต้นทาง 1 | Required |
| RequestReference2 | รหัสอ้างอิงการชำระเงินของระบบต้นทาง 2 | | 
| RequestReference3 | รหัสอ้างอิงการชำระเงินของระบบต้นทาง 3 | |
| Source | รหัสต้นทาง (DGA จะเป็นผู้กำหนดให้) | Required |
| Data | ข้อมูลอื่นๆสำหรับการยืนยันการชำระเงินของระบบต้นทาง (ถ้ามี และต้องทำการตกลงรูปแบบการส่งกับทาง DGA ก่อน) |

Response

```json
{
"status": "ResponseStatusEnum",
"errorCode": "ErrorCodeEnum", 
"message": "String",
"data": {
	"orderRef": "String", 
	"orderRef1": "String", 
	"orderRef2": "String", 
	"amount": "Decimal", 
	"merchantId": "String", 
	"currCode": "String", 
	"lang": "String", 
	"payType": "String", 
	"payMethod": "String", 
	"securityKey": "String", 
	"gatewayUrl": "String",
	"successUrl": "String",
	"failUrl": "String",
	"cancelUrl": "String",
}
}
```

Response Parameters

| รายการข้อมูล | รายละเอียด |
| -- | -- |
| Status | สถานะการเรียกใช้งาน service (ดูสถานะทั้งหมดที่ Appendix : ResponseStatusEnum คลิก) |
| ErrorCode | Error code ถ้าหากเรียกสำเร็จ (Success) จะเป็น null (ดูสถานะทั้งหมดที่ Appendix : ErrorCodeEnum คลิก) |
| Message | คำอธิบายสถานะการเรียกใช้งาน service |
| OrderRef | รหัสอ้างอิงการชำระเงิน 1 |
| OrderRef1 | รหัสอ้างอิงการชำระเงิน 2 |
| OrderRef2 | รหัสอ้างอิงการชำระเงิน 3 |
| Amount | ยอดชำระ |
| MerchantId | หมายเลขร้านค้าที่ลงทะเบียนไว้กับ KTB |
| CurrCode | รหัสสกุลเงิน (764 = THB, 840 = USD) |
| Lang | รหัสภาษา (T = ภาษาไทย, E = ภาษาอังกฤษ) |
| PayType | รูปแบบการชำระเงิน (N = ชำระเงินปกติ, H = ชะลอการชำระเงิน) |
| PayMethod | ช่องทางการชำระเงิน (CC = เครดิต/เดบิต, QR = คิวอาร์โค้ด) |
| SecurityKey | รหัสความปลอดภัยที่ใช้สำหรับยืนยันการชำระเงินกับทาง KTB GateWay |
| GatewayUrl | ที่อยู่ของหน้าเว็บ (Url) KTB Gateway |
| SuccessUrl | ที่อยู่ของหน้าเว็บที่ต้องการให้ Browser ชี้ไป (Redirect) ในกรณีชำระเงินสำเร็จ |
| FailUrl | ที่อยู่ของหน้าเว็บที่ต้องการให้ Browser ชี้ไป (Redirect) ในกรณีชำระเงินไม่สำเร็จ |
| CancelUrl | ที่อยู่ของหน้าเว็บที่ต้องการให้ Browser ชี้ไป (Redirect) ในกรณีผู้ใช้งานยกเลิกการชำระเงิน |

ตัวอย่างการเรียกใช้งาน

```json
Request
[POST]  https://api.egov.go.th/ws/dga/dev/payment/create

Content-Type: application/json
Consumer-Key: {{consumerKey}}
Token: {{token}}

{
    "Source": "DGA",
    "CustomerID": "1234567890123",
    "CustomerTitleName": "นาย",
    "CustomerFirstName": "ทดสอบ",
    "CustomerMiddleName": "",
    "CustomerLastName": "ระบบ",
    "BankCode": "KTB",
    "PaymentType": "FastPay",
    "Amount": "1000",
    "RequestReference1": "123456789",
    "RequestReference2": "",
    "RequestReference3": "",
}

Response

{
"status": 0, 
"errorCode": null, 
"message": "Success", 
"data": {
	"orderRef": "202212091544433591",
	"orderRef1": "1234567890123",
	"orderRef2": null, 
	"amount": 1000,
	"merchantId": "900000001", 
	"currCode": "764", 
	"lang": "T", 
	"payType": "N", 
	"payMethod": "CC",
	"securityKey": "1A5497AC9335872B8C41DA3EE1B6296FAEC67AC55F995D52B0A22FB518E8BC2D55AA3E9E70B8625AC7CDF", 
	"gatewayUrl": "https://uatktbfastpay.ktb.co.th/SIT/eng/payment/payForm.jsp", 
	"successUrl": "https://trial.dga.or.th/e-payment/ktb/qrpayment/success",
	"failUrl": "https://trial.dga.or.th/e-payment/ktb/qrpayment/fail", 
	"cancelUrl": "https://trial.dga.or.th/e-payment/ktb/qrpayment/cancel"
}
}
```

### 4 API ปิด Payment Transaction

| API [Production] | https://api.egov.go.th/ws/dga/uat/payment/close |
| -- | -- |
| API [UAT] | https://api.egov.go.th/ws/dga/uat/payment/close |
| API [Test] | https://api.egov.go.th/ws/dga/dev/payment/close |
| Method | POST |

Request Header

| รายการข้อมูล | รายละเอียด |
| -- | -- | 
| Consumer-Key | Consumer-Key ที่ได้ลงทะเบียนกับ สพร. (ระบบส่งให้ทาง e-Mail ที่ลงทะเบียนไว้) |
| Token | Token String ที่ได้จากการ API ขอ Token |
| Content-Type | กำหนดค่าดังนี้ : application/json |

Request Body

```json
{
  "reference1": "String", 
  "reference2": "String"
}
```

Request Body Parameters

| รายการข้อมูล | รายละเอียด | |
| Reference1 | รหัสอ้างอิงการชำระเงิน 1 | Required |
| Reference2 | รหัสอ้างอิงการชำระเงิน 2 | Required |

Response

```json
{
"status": ":ResponseStatusEnum", 
"errorCode": "ErrorCodeEnum", 
"message": "String", 
"data": "Object"
}
```

Response Parameters

| รายการข้อมูล | รายละเอียด |
| -- | -- |
| Status | สถานะการเรียกใช้งาน service (ดูสถานะทั้งหมดที่ Appendix : ResponseStatusEnum คลิก) |
| ErrorCode | Error code ถ้าหากเรียกสำเร็จ (Success) จะเป็น null (ดูสถานะทั้งหมดที่ Appendix : ErrorCodeEnum คลิก) |
| Message | คำอธิบายสถานะการเรียกใช้งาน service |
| Data	| ข้อมูลเพิ่มเติม (ถ้าไม่มีจะเป็น null) |

ตัวอย่างการเรียกใช้งาน

```json
Request
[POST] https://api.egov.go.th/ws/dga/dev/payment/close
Content-Type: application/json
Consumer-Key : {{consumerKey}}
Token: {{token}}

{
  "reference1" : "12345667789", 
  "reference2" : "12345", 
}

Response

{
"status": 0, 
"errorCode": null, 
"message": "Success", 
"data": null
}
```

### 5 API Void Payment (เฉพาะช่องทาง FastPay)

| API [Production] | https://api.egov.go.th/ws/dga/payment/void |
| -- | -- |
| API [UAT] | https://api.egov.go.th/ws/dga/uat/payment/void |
| API [Test] | https://api.egov.go.th/ws/dga/dev/payment/void |
| Method | POST |

Request Header

| รายการข้อมูล | รายละเอียด |
| -- | -- |
| Consumer-Key | Consumer-Key ที่ได้ลงทะเบียนกับ สพร. (ระบบส่งให้ทาง e-Mail ที่ลงทะเบียนไว้) |
| Token | Token String ที่ได้จากการ API ขอ Token |
| Content-Type | กำหนดค่าดังนี้ : application/json |

Request Body

```json
{
  "reference1": "String",
  "reference2": "String", 
  "paymentReference": "String" 
}
```

Request Body Parameters

| รายการข้อมูล | รายละเอียด |
| -- | -- |
| Reference1 | รหัสอ้างอิงการชำระเงิน 1 | Required |
| Reference2 | รหัสอ้างอิงการชำระเงิน 2 | Required |
| PaymentReference | รหัสอ้างอิงที่ได้หลังจากการชำระเงิน | Required |

Response

```json
{
"status": "ResponseStatusEnum", 
"errorCode": "ErrorCodeEnum", 
"message": "String", 
"data": "Object"
}
```

Response Parameters

| รายการข้อมูล | รายละเอียด |
| -- | -- |
| Status | สถานะการเรียกใช้งาน service (ดูสถานะทั้งหมดที่ Appendix : ResponseStatusEnum คลิก) | 
| ErrorCode | Error code ถ้าหากเรียกสำเร็จ (Success) จะเป็น null (ดูสถานะทั้งหมดที่ Appendix : ErrorCodeEnum คลิก) |
| Message | คำอธิบายสถานะการเรียกใช้งาน service |
| Data | ข้อมูลเพิ่มเติม (ถ้าไม่มีจะเป็น null) |

ตัวอย่างการเรียกใช้งาน

```json
Request
[POST] https://api.egov.go.th/ws/dga/dev/payment/void
Content-Type: application/json
Consumer-Key : {{consumerKey}}
Token: {{token}}

{
  "reference1": "123456789", 
  "reference2": "12345", 
  "paymentReference": "asdfg" 
}

Response
{
"status": 0, 
"errorCode": null, 
"message": "Success", 
"data": null
}
```

### 6 API ตรวจสอบสถานะการชำระเงิน

| API [Production] | https://api.egov.go.th/ws/dga/payment/status |
| -- | -- |
| API [UAT] | https://api.egov.go.th/ws/dga/uat/payment/status |
| API [Test] | https://api.egov.go.th/ws/dga/dev/payment/status |
| Method | GET |

Request Header

| รายการข้อมูล | รายละเอียด |
| -- | -- |
| Consumer-Key | Consumer-Key ที่ได้ลงทะเบียนกับ สพร. (ระบบส่งให้ทาง e-Mail ที่ลงทะเบียนไว้) | 
| Token | Token String ที่ได้จากการ API ขอ Token |
| Content-Type | กำหนดค่าดังนี้ : application/json |

Query String

```http
?reference1={{String}}&reference2={{String}}
```

Query String Parameters

| รายการข้อมูล | รายละเอียด |
| -- | -- |
| Reference1 | รหัสอ้างอิงการชำระเงิน 1 | Required |
| Reference2 | รหัสอ้างอิงการชำระเงิน 2 | Required |

Response

```
{
"status": "ResponseStatusEnum", 
"errorCode": "ErrorCodeEnum", 
"message": "String", 
"data": {
	"paidStatus": "PaymentTransactionStatusEnum", 
  		"description": "String", 
  		"paidDate": "String", 
  		"paidChannel": "String",
  		"confirmPaidDate": "String", 
  		"refId": "String", 
  		"ref1": "String", 
  		"ref2": "String",
  		"cardNo": "string", 
  		"paymentType": "PaymentTypeEnum", 
  		"amount": "Decimal", 
  		"feeAmount": "Decimal", 
  		"voidDate": "String", 
  		"requestRefundDate": "String", 

}
}
```

Response Parameters

| รายการข้อมูล | รายละเอียด |
| -- | -- |
| Status | สถานะการเรียกใช้งาน service (ดูสถานะทั้งหมดที่ Appendix : ResponseStatusEnum คลิก) |
| ErrorCode | Error code ถ้าหากเรียกสำเร็จ (Success) จะเป็น null (ดูสถานะทั้งหมดที่ Appendix : ErrorCodeEnum คลิก) |
| Message | คำอธิบายสถานะการเรียกใช้งาน service |
| PaidStatus | สถานะการชำระเงิน |
| Description | คำอธิบายสถานะการชำระเงิน |
| PaidDate | วันที่ชำระเงิน (รูปแบบวันที่ : yyyy-MM-ddTHH:mm:ss) |
| PaidChannel | ช่องทางการชำระเงิน |
| ConfirmPaidDate | วันที่ยืนยันการรับชำระเงิน |
| RefId	| รหัสอ้างอิงที่ได้รับหลังจากการชำระเงิน |
| Ref1	| รหัสอ้างอิงการชำระเงิน 1 |
| Ref2	| รหัสอ้างอิงการชำระเงิน 2 |
| CardNo | หมายเลขบัตรเครดิต/เดบิท (เฉพาะช่องทาง Fastpay) |
| PaymentType | ช่องทางการชำระเงิน |
| Amount | ยอดชำระ |
| FeeAmount | ค่าธรรมเนียมการชำระเงิน |
| VoidDate | วันที่ยกเลิกการชำระเงิน (เฉพาะช่องทาง Fastpay) |
| requestRefundDate | วันที่ทำการขอคืนเงิน (เฉพาะช่องทาง Fastpay) |

ตัวอย่างการเรียกใช้งาน

```json
Request
[GET] https://api.egov.go.th/ws/dga/dev/payment/status?reference1=123456789&reference2=12345

Consumer-Key: {{consumerKey}}
Token: {{token}}

Response
{
  "status": 0,
  "errorCode": null,
  "message": "Success",
  "data": {
    "paidStatus": "Success",
    "description": null,
    "paidDate": "2022-09-22T11:03:36",
    "paidChannel": "บัตรเครดิต/เดบิต",
    "confirmPaidDate": "2022-09-22T11:03:36",
    "refId": "7447066",
    "ref1": "6500000100",
    "ref2": "62025465",
    "cardNo": "403375\*\*\*\*\*\*6369",
    "paymentType": "C",
    "amount": 1000,
    "feeAmount": 0,
    "voidDate": "",
    "requestRefundDate": ""
  }
}
```

### 7 API รับสถานะตอบกลับการชำระเงิน (Callback Status)

หน่วยงานจะต้องทำ API เพื่อรับ Callback Status จากทาง DGA ซึ่งหลังจากผู้ใช้งานทำการชำระเงินแล้ว ทาง DGA จะทำการส่งสถานะกลับไปให้โดยอัตโนมัติตาม API ที่หน่วยงานระบุ ด้วย Request รายละเอียดดังนี้

| API [Production] | หน่วยงานต้องระบุและแจ้งกลับมาที่ DGA ก่อนทำการใช้งาน |
| -- | -- |
| API [UAT] | หน่วยงานต้องระบุและแจ้งกลับมาที่ DGA ก่อนทำการใช้งาน |
| API [Test] | หน่วยงานต้องระบุและแจ้งกลับมาที่ DGA ก่อนทำการใช้งาน |
| Method | POST |

Request Body

```json
{
  "paidStatus": "PaymentTransactionStatusEnum", 
  "description": "String", 
  "paidDate": "String", 
  "paidChannel": "String", 
  "confirmPaidDate": "String", 
  "refId": "String", 
  "ref1": "String", 
  "ref2": "String", 
  "cardNo": "String", 
  "paymentType": ":PaymentTypeEnum",
  "amount": "Decimal", 
  "feeAmount": "Decimal",
  "voidDate": "String",
  "requestRefundDate": "String"
}
```

Request Body Parameters

| รายการข้อมูล | รายละเอียด |
| -- | -- |
| PaidStatus | สถานะการชำระเงิน (ดูสถานะทั้งหมดที่ Appendix : PaymentTransactionStatusEnum คลิก) | Required |
| Description | คำอธิบายสถานะการชำระเงิน | |
| PaidDate | วันที่ชำระเงิน (รูปแบบวันที่ : yyyy-MM-ddTHH:mm:ss)  เช่น 2023-01-31T10:00:00 | Required |
| PaidChannel | ช่องทางการชำระเงิน | Required |
| ConfirmPaidDate | วันที่ยืนยันการรับชำระเงิน (รูปแบบวันที่ : yyyy-MM-ddTHH:mm:ss)  เช่น 2023-01-31T10:00:00 | Required |
| RefId | รหัสอ้างอิงที่ได้หลังจากการชำระเงิน | Required |
| Ref1 | รหัสอ้างอิงการชำระเงิน 1 | Required |
| Ref2 | รหัสอ้างอิงการชำระเงิน 2 | Required |
| CardNo | หมายเลขบัตรเครดิต/เดบิท | |
| PaymentType | ช่องทางการชำระเงิน (ดูสถานะทั้งหมดที่ Appendix : PaymentTypeEnum คลิก) | Required |
| Amount | ยอดชำระ | Required |
| FeeAmount | ค่าธรรมเนียมการชำระเงิน | Required |
| VoidDate | วันที่ยกเลิกการชำระเงิน (รูปแบบวันที่ : yyyy-MM-ddTHH:mm:ss)  เช่น 2023-01-31T10:00:00 | |
| RequestRefundDate | วันที่ทำการขอคืนเงิน (รูปแบบวันที่ : yyyy-MM-ddTHH:mm:ss)  เช่น 2023-01-31T10:00:00 | |

Response

```json
{
  "requestTimeStamp" : "Interger"
  "message": "String", 
  "result": "Bool"
}
```

Response Parameters

| รายการข้อมูล | รายละเอียด |
| -- | -- |
| requestTimeStamp | เวลาที่ทำการ response สถานะ (timestamp) |
| Message | คำอธิบายสถานะการ response status |
| Result | หากหน่วยงานได้รับ Callback Status สำเร็จให้ทำการตอบกลับมาเป็น "true" หากไม่สำเร็จ ให้ตอบกลับมาเป็น "false" |

ตัวอย่างการเรียกใช้งาน

```json
Request
[POST]  Url ที่ หน่วยงานระบุ เพื่อรับ Callback Status
Content-Type: application/json
{
  " PaidStatus":  0,
  " Description": "Success", 
  " PaidDate": "2022-09-22T11:03:36", 
  " PaidChannel": "บัตรเครดิต/เดบิต",
  " ConfirmPaidDate": "2022-09-22T11:03:36", 
  " RefId": "7447066", 
  " Ref1": "123456789", 
  " Ref2": "12345", 
  " CardNo": "403375\*\*\*\*\*\*6369", 
  " PaymentType": "C", 
  " Amount": 1000, 
  " FeeAmount": 0, 
  " VoidDate": "", 
  " requestRefundDate": ""
}
```


Response

```json
{
  "requestTimeStamp" : 1671095890
  "message": "Success", 
  "result": true
}
```

### 8 Appendix

ข้อมูล  Enumeration Type

```json
BankCodeEnum
{
[Description("กรมบัญชีกลาง")] 
CGD = 1,
[Description("ธนาคารกรุงไทย")] 
KTB = 2,
}

```json
PaymentTypeEnum
{
[Description("บิลเพย์เมนต์")]
BillPayment = 1,
[Description("บิลเพย์เมนต์")]
DirectLink = 2,
[Description("บัตรเครดิต/เดบิต")]
FastPay = 3,
[Description("อินเทอร์เน็ตแบงก์กิ้ง")]
PageToPage = 4,
[Description("คิวอาร์เพย์เมนต์")]
QRPayment = 5,
[Description("แอปพลิเคชันธนาคาร")]
AppToApp = 6
}
```

```json
PaymentTransactionStatusEnum
{
[Description("รอการชำระเงิน")]
Pending = 0,
[Description("ชำระเงินสำเร็จ")]
Success = 1,
[Description("ปฏิเสธชำระเงิน")]
Rejected = 2,
[Description("ชำระเงินไม่สำเร็จ")]
Failed = 3,
[Description("ยกเลิกการชำระเงิน")]
Void = 4,
[Description("ผิดพลาด")]
Others = 5,
[Description("หมดอายุ")]
Expired = 6,
[Description("คืนเงินสำเร็จ")]
Refunded = 7,
[Description("ยื่นเรื่องขอคืนเงิน")]
RequestRefund = 8
}
```

```json
ResponseStatusEnum
{
[Description("Success")] 
Success = 0,
[Description("SuccessWithError")] 
SuccessWithError = 1,
[Description("Warning")] 
Warning = 2,
[Description("Error")] 
Error = 3
}
```

```json
ErrorCodeEnum
{
[Description("Others")]
Others = 999,
[Description("Invalid Request")]
InvalidRequest = 1,
[Description("Invalid Source")]
InvalidSource = 2,
[Description("Invalid Data")]
InvalidData = 3,
[Description("Invalid PaidDate")]
InvalidPaidDate = 4,
[Description("Invalid ExpiredDate")]
InvalidExpiredDate = 5,
[Description("Invalid Invoice")]
InvalidInvoice = 6,
[Description("Invalid Amount")]
InvalidAmount = 7,
[Description("Transaction Not Found")]
TransactionNotFound = 8,
[Description("Source Not Found")]
SourceNotFound = 9,
[Description("Data Not Found")]
DataNotFound = 10,
[Description("Unsupported PaymentType")]
UnsupportedPaymentType = 11,
[Description("Endpoint Service Unavailable")]
EndpointServiceUnavailable = 12,
[Description("Invalid Endpoint Data")]
InvalidEndpointData = 13,
[Description("Paid Payment Cannot Be Closed")]
PaidPaymentCannotBeClosed = 14,
[Description("File Downloading Failed")]
FileDownloadingFailed = 15,
[Description("File Uploading Failed")]
FileUploadingFailed = 16,
[Description("File Rendering Failed")]
FileRenderingFailed = 17,
[Description("File Service Unavailable")]
FileServiceUnavailable = 18,
[Description("Unable To Void Transaction")]
UnableToVoidTransaction = 19,
[Description("Unable To Refund Transaction")]
UnableToRefundTransaction = 20,
[Description("Reference Number Duplicate")]
ReferenceNumberDuplicate = 21,
[Description("Transaction Locked")]
TransactionLocked = 22
}
```
