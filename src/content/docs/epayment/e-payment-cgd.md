---
title: คู่มือการพัฒนาเพื่อใช้งาน e-Payment กรมบัญชีกลาง
weight: 10
date: 2024-03-04T09:51:16.331Z
---
### 1. ขั้นตอนการพัฒนา

1. ลงทะเบียนกับกรมบัญชีกลาง (คู่มือและแบบฟอร์มลงทะเบียนศูนย์ต้นทุนกับกรมบัญชีกลาง) เพื่อกำหนด Catalog ของศูนย์ต้นทุน
2. ลงทะเบียนใช้งาน API กับ สพร. โดย สพร จะส่ง Consumer-Key และข้อมูลสำหรับทดสอบการเรียก API ให้หน่วยงาน
3. ทดสอบและพัฒนาระบบ โดยเรียก API

   * API ขอ Token
   * API สร้าง BillPayment
   * API ตรวจสอบถานะการรับชำระเงิน

### 2 API ขอ Token

การเรียกใช้งานข้อมูลผ่าน Government API มี 2 ขั้นตอน ตัวอย่าง Source Code ดังนี้ \[คลิกเพื่อดูรายละเอียด] 

| หัวข้อ            | รายละเอียด                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| API \[Production] | https://api.egov.go.th/ws/auth/validate?ConsumerSecret=\[Secret]&AgentID=\[เลขประจำตัวประชาชน] |
| Method            | GET                                                                                            |

Request Parameters

| รายการข้อมูล   | รายละเอียด                                                                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ConsumerSecret | เช่น ConsumerSecret=xxxxxxxxxxxxxx                                                                                                                         |
| AgentID        | เลขประจำตัวประชาชน 13 หลัก เช่น AgentID=1234567890123 <br/>กรณีเรียก API Personal Signing ต้องกำหนด AgentID เป็นเลขประจำตัวประชาชนของผู้เซ็นเอกสารเท่านั้น |

Request Header

| รายการข้อมูล | รายละเอียด                                                                  |
| ------------ | --------------------------------------------------------------------------- |
| Consumer-Key | Consumer-Key ที่ได้ลงทะเบียนกับ สพร. (ระบบส่งให้ทาง e-Mail ที่ลงทะเบียนไว้) |

Response

```json
BODY
{
"Result": "8e1ac089-0000-aaaa-0000-403c0c9ab867"
}
```

Response Parameters

| รายการข้อมูล | รายละเอียด                                                                                                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result       | Token String สำหรับใช้ในการเรียก API ต่างๆ <br />(กรณีขอ Token ไม่สำเร็จ หรือ error อื่นๆ ให้ทำการเรียก API ใหม่อีกครั้ง จนกว่าจะได้ Token ไปใช้เรียกเรียกร่วมกับ API อื่นๆ) |

### 3 API สร้าง Bill Payment

https://trial.dga.or.th/e-payment/api/docs/index.html

| รายการข้อมูล      | รายละเอียด                                       |
| ----------------- | ------------------------------------------------ |
| API \[Production] | https://api.egov.go.th/ws/dga/payment/create     |
| API \[Test]       | https://api.egov.go.th/ws/dga/uat/payment/create |
| Method            | POST                                             |

Request Headers

| รายการข้อมูล | รายละเอียด                                                                  |
| ------------ | --------------------------------------------------------------------------- |
| Consumer-Key | Consumer-Key ที่ได้ลงทะเบียนกับ สพร. (ระบบส่งให้ทาง e-Mail ที่ลงทะเบียนไว้) |
| Token        | Token String ที่ได้จากการ API ขอ Token                                      |
| Content-Type | กำหนดค่าดังนี้ : application/json                                           |

Request Body

```json
Body{
    "source": "หน่วยงาน",
    "customerID": "7997085658966",
    "customerTitleName": "นาย",
    "customerFirstName": "Biz",
    "customerMiddleName": "",
    "customerLastName": "User",
    "bankCode": "CGD",
    "paymentType": "BillPayment",
    "amount": "10000",
    "requestReference1": "C640810399",
    "requestReference2": "",
    "requestReference3": "",
    "data": {
        "username": "xxxxxxxx",
        "password": "xxxxxxxxxx",
        "orgNameEN": "Bangrak District  Office",
        "orgNameTH": "สำนักงานเขตบางรัก",
        "orgPhoneNumber": "+6622361395 ต่อ/ext. 6205-8",
        "invoiceStartDate": "2021-08-11T10:37:13.13+07:00",
        "invoiceEndDate": "2021-08-30T07:00:00.00+07:00",
        "houseNo": "1",
        "buildingName": "",
        "moo": "",
        "soi": "",
        "road": "",
        "tambonCode": "10040500",
        "amphurCode": "10040000",
        "provinceCode": "10000000",
        "postcode": "10500",
        "mobileNo": "0881852361",
        "email": "test@abc.or.th",
        "catalogs": [
            {
                "costCenterCode": "2100700004",
                "costCenterCodeDesc": "ฝ่ายคลัง",
                "catalogCode": "2100700033",
                "catalogName": "ค่าธรรมเนียมใบอนุญาต",
                "catalogDesc": "รายละเอียดค่าธรรมเนียมใบอนุญาต",
                "amount": "10000"
            }
        ]
    }
}
```

Request Body Parameters

| รายการข้อมูล       | รายละเอียด                                                                |         |     |
| ------------------ | ------------------------------------------------------------------------- | ------- | --- |
| source             | ชื่อหน่วยงาน เช่น "DGA"                                                   | Require |     |
| customerID         | เช่น "7997085658966"                                                      | Require |     |
| customerTitleName  | คำนำหน้าชื่อ เช่น "นาย"                                                   | Require |     |
| customerFirstName  | ชื่อ                                                                      | Require |     |
| customerMiddleName | ชื่อกลาง                                                                  | Require |     |
| customerLastName   | นามสกุล                                                                   |         |     |
| bankCode           | กำหนดค่าเป็น "CGD"                                                        |         |     |
| paymentType        | กำหนดค่าเป็น "BillPayment"                                                |         |     |
| amount             | 10000                                                                     |         |     |
| requestReference1  | เช่น "C640810399"                                                         |         |     |
| requestReference2  | requestReference3                                                         |         |     |
| data               |                                                                           |         |     |
| username           | Username กรมบัญชีกลาง (สำหรับทดสอบติดต่อ สพร.)                            |         |     |
| password           | รหัสผ่าน กรมบัญชีกลาง (สำหรับทดสอบติดต่อ สพร.)                            |         |     |
| orgNameEN          | ชื่อหน่วยงานภาษาอังกฤษ เช่น "Bangrak District  Office"                    |         |     |
| orgNameTH          | ชื่อหน่วยงานภาษาไทย เช่น "สำนักงานเขตบางรัก"                              |         |     |
| orgPhoneNumber     | หมายเลขโทรศัพท์ เช่น "+6622361395 ต่อ/ext. 6205-8"                        |         |     |
| invoiceStartDate   | วันที่เริ่มชำระเงิน เช่น "2021-08-11T10:37:13.13+07:00"                   |         |     |
| invoiceEndDate     | วันที่สิ้นสุดการชำระเงิน เช่น "2021-08-30T07:00:00.00+07:00"              |         |     |
| houseNo            | เลขที่บ้าน เช่น "1"                                                       |         |     |
| buildingName       | ชื่ออาคาร                                                                 |         |     |
| moo                | หมู่ที่                                                                   |         |     |
| soi                | ซอย                                                                       |         |     |
| road               | ถนน                                                                       |         |     |
| tambonCode         | รหัสตำบล เช่น "10040500" \[ดู Address Code]                               |         |     |
| amphurCode         | รหัสอำเภอ เช่น "10040000"                                                 |         |     |
| provinceCode       | รหัสจังหวัด เช่น "10000000"                                               |         |     |
| postcode           | รหัสไปรษณีย์ เช่น "10500"                                                 |         |     |
| mobileNo           | หมายเลขโทรศัพท์                                                           |         |     |
| email              | อีเมล์                                                                    |         |     |
| catalogs           |                                                                           |         |     |
| costCenterCode     | รหัสศูนย์ต้นทุน ที่กำหนดไว้กับกรมบัญชีกลาง เช่น "2100700004"              |         |     |
| costCenterCodeDesc | ชื่อศูนย์ต้นทุน ที่กำหนดไว้กับกรมบัญชีกลาง เช่น "ฝ่ายคลัง"                |         |     |
| catalogCode        | รหัสรายการรับชำระ เช่น "2100700033"                                       |         |     |
| catalogName        | ชื่อรายการรับชำระ ต้องตรงกับที่สร้างไว้ใน catalog ของกรมบัญชีกลางเท่านั้น |         |     |
| catalogDesc        | รายละเอียดรายการรับชำระ เช่น "ค่าธรรมเนียมใบอนุญาต"                       |         |     |
| amount             | จำนวนเงิน(บาท) เช่น "10000"                                               |         |     |

Response

```json
Body{
    "status": 0,
    "errorCode": null,
    "message": "Success",
    "data":{
        "billPaymentFileUrl": "http://ws.ega.or.th/e-payment/api/file/61274f0970b8b30b547b1901",
        "billPaymentBase64String": "JVBERi0xLjQ.........e19/Lrrf4OWU2DiAmmOXJ/EIVPRgo=",
        "billPaymentContentType": "application/pdf",
        "billPaymentFileSize": 264263,
        "billPaymentFileName": "C640810399.pdf",
        "billerID": "000000000000003",
        "billNo": "21082600000003",
        "reference1": "2108260000000003",
        "reference2": "21080003",
        "reference3": null
    }
}
```

Response Parameters

| รายการข้อมูล            | รายละเอียด                                                                      |
| ----------------------- | ------------------------------------------------------------------------------- |
| status                  | สถานะ เช่น 0                                                                    |
| errorCode               | error code                                                                      |
| message                 | คำอธิบาย เช่น "Success"                                                         |
| data                    |                                                                                 |
| billPaymentFileUrl      | URL Bill Payment เช่น "http://ws.ega.or.th/e-payment/api/file/0000000000000000" |
| billPaymentBase64String | Bill Payment Base64                                                             |
| billPaymentContentType  | File type เช่น "application/pdf"                                                |
| billPaymentFileSize     | ขนาด File(Byte) เช่น 264263                                                     |
| billPaymentFileName     | ชื่อ File เช่น 000000000000.pdf                                                 |
| billerID                | เช่น "000000000000003"                                                          |
| billNo                  | เช่น "21082600000003"                                                           |
| reference1              | หมายเลขอ้างอิง1                                                                 |
| reference2              | หมายเลขอ้างอิง2                                                                 |
| reference3              | หมายเลขอ้างอิง3                                                                 |

#### 4 API ตรวจสอบสถานะการรับชำระเงิน

| API \[Production] | https://api.egov.go.th/ws/dga/payment/status?reference1=0000000000000000&reference2=00000000     |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| API \[TEST]       | https://api.egov.go.th/ws/dga/uat/payment/status?reference1=0000000000000000&reference2=00000000 |
| Method            | GET                                                                                              |

Request Parameters

| รายการข้อมูล | รายละเอียด                                       |
| ------------ | ------------------------------------------------ |
| reference1   | หมายเลขอ้างอิง1 เช่น reference1=0000000000000000 |
| reference2   | หมายเลขอ้างอิง2 เช่น reference2=00000000         |

Request Header

| รายการข้อมูล | รายละเอียด                                                                  |
| ------------ | --------------------------------------------------------------------------- |
| Consumer-Key | Consumer-Key ที่ได้ลงทะเบียนกับ สพร. (ระบบส่งให้ทาง e-Mail ที่ลงทะเบียนไว้) |
| Content-Type | กำหนดค่าดังนี้ : application/json                                           |

Response

```json
Body{
    "status": 0,
    "errorCode": null,
    "message": "\[200] สำเร็จแต่ไม่ยืนยันผลการชำระเงินจากกรมบัญชีกลางได้เนื่องจาก CGD firewall หมดอายุ",
    "data":{
    "paidStatus": "Success",
    "description": "ชำระเงินสำเร็จ",
    "paidDate": "2021-08-26T08:27:34.713Z",
    "paidChannel": null,
    "paidSource": null,
    "confirmPaidDate": "2021-08-26T08:27:34.714Z",
    "invoiceCode": null,
    "receiptCode": null,
    "receiptedDate": null
    }
}
```

Response Parameters

| รายการข้อมูล | รายละเอียด |
| -- | -- |
| status | สถานะ เช่น 0 |
| errorCode | error code |
| message | เช่น "\[200] สำเร็จแต่ไม่ยืนยันผลการชำระเงินจากกรมบัญชีกลางได้เนื่องจาก CGD firewall หมดอายุ" |
| data | |
| paidStatus | สถานะการรับชำระ เช่น "Success" |
| description | รายละเอียดสถานะการรับชำระเงิน เช่น "ชำระเงินสำเร็จ" |
| paidDate | วันที่ชำระเงิน เช่น "2021-08-26T08:27:34.713Z" |
| paidChannel | ช่องทางการรับชำระเงิน |
| paidSource | PaidSource |
| confirmPaidDate | วันที่ยืนยันการรับชำระเงิน เช่น "2021-08-26T08:27:34.714Z" |
| invoiceCode | InvoiceCode |
| receiptCode | ReceiptCode |
| receiptedDate | ReceiptedDate |
