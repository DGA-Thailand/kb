---
title: "API สำหรับเชื่อมโยงระบบ Service Request and Tracking (SRAT)"
---

## 1 API สำหรับขอ Token
  
วิธีใช้ API ขอ Token

## 2 API GET Application
  
API นี้เป็น Rest Service API สำหรับดึงข้อมูลคำร้องที่อยู่ระหว่างการพิจารณา หรือดำเนินการเสร็จสิ้นแล้ว

| หัวข้อ | รายละเอียด |
| --- | --- |
| 
API [Production] | https://api.egov.go.th/ws/ws/dga/srat/v1/application |
| API [TEST] | https://api.egov.go.th/ws/ws/dga/srat/v1/test/application
| Method | GET |
 

Request Parameters

| รายการข้อมูล | รายละเอียด |
| --- | --- |
| serviceNo | รหัสของบริการ (string) |
| fromDate | ต้องการดึงข้อมูลตั้งแต่วันที่ (format datetime UTC) เช่น 2021-09-27T06:18:16.211Z |
| onlySuccess | ดึงเฉพาะรายการคำร้องที่ได้รับการอนุมัติแล้วเท่านั้น ระบุค่า true, false(default) | 

Request Header

| รายการข้อมูล | รายละเอียด |
| --- | --- |
| Consumer-Key | Consumer-Key ที่ได้ลงทะเบียนกับ สพร. (ระบบส่งให้ทาง e-Mail ที่ลงทะเบียนไว้) |
| Token | Token ที่ได้จากการเรียก api ขอ Token |
 

Response

```json
{
  "lastSyncDate": "2022-08-24T02:20:34.954Z",
  "status": "Completed",
  "results": [
    {
      "Id": "63033298a6168d5ffae2a80f",
      "Applicant": {
        "CitizenId": "1913323903854",
        "Religion": null,
        "Identifier": "1913323903854",
        "Id": null,
        "Title": "นาย",
        "FirstName": "biz",
        "MiddleName": null,
        "LastName": "construct5",
        "FullName": "นายbiz  construct5",
        "Telephone": null,
        "Email": "siriwan.iambandit@dga.or.th",
        "Address": {
          "AddressNo": "212",
          "BuildingName": null,
          "FloorNo": null,
          "RoomNo": null,
          "VillageNo": "1",
          "Soi": "",
          "Road": "",
          "SubDistrict": "บางกระสอ",
          "District": "เมืองนนทบุรี",
          "Province": "นนทบุรี",
          "PostCode": "11000",
          "GeoCode": "120104",
          "Latitude": null,
          "Longitude": null,
          "Contacts": [
            {
              "ContactType": "Telephone",
              "ContactDetail": "0895171685"
            }
          ]
        },
        "ContactAddress": null,
        "Contacts": [],
        "Nationality": "ไทย",
        "Age": "88"
      },
      "SubmitDate": "2022-08-22T07:39:00.119Z",
      "ReceiveDate": "2022-08-22T07:54:32.449Z",
      "ReceiveNo": "1/27",
      "ApplicationNo": "C650822001",
      "Address": {
        "AddressNo": "212",
        "BuildingName": "",
        "FloorNo": null,
        "RoomNo": "",
        "VillageNo": "1",
        "Soi": null,
        "Road": "",
        "SubDistrict": "บางกระสอ",
        "District": "เมืองนนทบุรี",
        "Province": "นนทบุรี",
        "PostCode": "11000",
        "GeoCode": "120104",
        "Latitude": "13.7605358",
        "Longitude": "100.5267991",
        "Contacts": [
          {
            "ContactType": "Telephone",
            "ContactDetail": "0895171685"
          },
          {
            "ContactType": "Fax",
            "ContactDetail": ""
          },
          {
            "ContactType": "Email",
            "ContactDetail": ""
          },
          {
            "ContactType": "Mobile",
            "ContactDetail": ""
          }
        ]
      },
      "IssuedBy": null,
      "Name": "ขอหนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายหรือสะสมอาหาร (ไม่เกิน 200 ตร.ม.)",
      "FinishDate": "2022-08-22T08:25:16.053Z",
      "Licenses": [
        {
          "Type": "ใบอนุญาต",
          "Name": "หนังสือรับรอง (แบบ สอ.4) พิจารณา_C650822001.pdf",
          "Size": 236193,
          "ContentType": "application/pdf",
          "FileURL": "63033b1470b8b318649f5fed"
        },
        {
          "Type": "ใบอนุญาต",
          "Name": "หนังสือรับรอง (แบบ สอ.4) ประชาชน ใบที่ 1_C650822001.pdf",
          "Size": 231822,
          "ContentType": "application/pdf",
          "FileURL": "63033c1070b8b318649f5ffc"
        },
        {
          "Type": "ใบอนุญาต",
          "Name": "หนังสือรับรอง (แบบ สอ.4) ประชาชน ใบที่ 2_C650822001.pdf",
          "Size": 213465,
          "ContentType": "application/pdf",
          "FileURL": "63033c4570b8b318649f6002"
        }
      ],
      "ApplicationAttachments": [
        {
          "DocName": "เอกสารยืนยันตัวตน เช่น บัตรประชาชน หรือหนังสือเดินทาง: บุคคลผู้ขออนุญาต",
          "FileId": "62a15da470b8b30668c28b58",
          "ContentType": "application/pdf",
          "FileSize": 59186,
          "FileURL": null
        },
        {
          "DocName": "เอกสารยืนยันตัวตน เช่น บัตรประชาชน หรือหนังสือเดินทาง: ผู้มอบอำนาจ(ไฟล์ที่ 1)",
          "FileId": "62a15e4870b8b30668c28b5b",
          "ContentType": "application/pdf",
          "FileSize": 59186,
          "FileURL": null
        },
        {
          "DocName": "หนังสือมอบอำนาจ(ไฟล์ที่ 1)",
          "FileId": "62a15e5570b8b30668c28b5e",
          "ContentType": "application/pdf",
          "FileSize": 61925,
          "FileURL": null
        },
        {
          "DocName": "เอกสารยืนยันตัวตน เช่น บัตรประชาชน หรือหนังสือเดินทาง: ผู้รับมอบอำนาจ(ไฟล์ที่ 1)",
          "FileId": "62a15e5d70b8b30668c28b61",
          "ContentType": "application/pdf",
          "FileSize": 62678,
          "FileURL": null
        },
        {
          "DocName": "หนังสือแจ้งการใช้หรือเปลี่ยนแปลงการใช้ประโยชน์ที่ดินตามกฎหมายว่าด้วยการผังเมือง",
          "FileId": "62a15e6170b8b30668c28b64",
          "ContentType": "application/pdf",
          "FileSize": 62965,
          "FileURL": null
        },
        {
          "DocName": "แผนที่สังเขป แสดงสถานที่ตั้งของร้าน/สถานประกอบการ",
          "FileId": "62a15e7570b8b30668c28b6d",
          "ContentType": "application/pdf",
          "FileSize": 59809,
          "FileURL": null
        },
        {
          "DocName": "ทะเบียนบ้าน:อาคารที่ตั้งร้าน / สถานประกอบการ",
          "FileId": "62a15e7b70b8b30668c28b70",
          "ContentType": "application/pdf",
          "FileSize": 59216,
          "FileURL": null
        },
        {
          "DocName": "สัญญาเช่า",
          "FileId": "62a15e6670b8b30668c28b67",
          "ContentType": "application/pdf",
          "FileSize": 45601,
          "FileURL": null
        },
        {
          "DocName": "หนังสือรับรองนิติบุคคล: ผู้ให้เช่า หรือยินยอมให้ใช้อาคารสถานที่",
          "FileId": "62a15e7170b8b30668c28b6a",
          "ContentType": "application/pdf",
          "FileSize": 59916,
          "FileURL": null
        },
        {
          "DocName": "หลักฐานเกี่ยวกับการใช้อาคารตามกฏหมายว่าด้วยการควบคุมอาคาร เช่น ใบอนุญาตก่อสร้าง (อ.1) หรือใบรับรองการเปิดใช้อาคาร",
          "FileId": "62a15e8270b8b30668c28b73",
          "ContentType": "application/pdf",
          "FileSize": 59186,
          "FileURL": null
        },
        {
          "DocName": "แผนผังหรือภาพถ่ายบริเวณภายในและภายนอกของสถานประกอบการ แสดงให้เห็นถึงการป้องกันมลพิษ",
          "FileId": "62a15ea770b8b30668c28b82",
          "ContentType": "application/pdf",
          "FileSize": 45601,
          "FileURL": null
        },
        {
          "DocName": "แผนผังหรือภาพถ่ายบริเวณภายในและภายนอกของสถานประกอบการ แสดงให้เห็นถึงสุขลักษณะภายในสถานประกอบการ",
          "FileId": "62a15eac70b8b30668c28b85",
          "ContentType": "application/pdf",
          "FileSize": 59916,
          "FileURL": null
        },
        {
          "DocName": "แผนผังหรือภาพถ่ายบริเวณภายในและภายนอกของสถานประกอบการ แสดงให้เห็นถึงระบบความปลอดภัยในการทำงาน",
          "FileId": "62a15eb170b8b30668c28b88",
          "ContentType": "application/pdf",
          "FileSize": 59809,
          "FileURL": null
        },
        {
          "DocName": "ใบรับรองแพทย์การตรวจโรคติดต่อ 9 โรค: ผู้สัมผัสอาหาร (นาย พล จัตวา)",
          "FileId": "62a15e8970b8b30668c28b76",
          "ContentType": "application/pdf",
          "FileSize": 59859,
          "FileURL": null
        },
        {
          "DocName": "ใบรับรองแพทย์การตรวจโรคติดต่อ 9 โรค: ผู้สัมผัสอาหาร (นาง แต๋น จัตวา)",
          "FileId": "62a15e9770b8b30668c28b79",
          "ContentType": "application/pdf",
          "FileSize": 61925,
          "FileURL": null
        },
        {
          "DocName": "ใบรับรองแพทย์การตรวจโรคติดต่อ 9 โรค: ผู้สัมผัสอาหาร (นางสาว แองจาลีน่า โจลี)",
          "FileId": "62a15e9b70b8b30668c28b7c",
          "ContentType": "application/pdf",
          "FileSize": 62678,
          "FileURL": null
        },
        {
          "DocName": "ใบรับรองแพทย์การตรวจโรคติดต่อ 9 โรค: ผู้สัมผัสอาหาร (นาย หม่อง ทองดี)",
          "FileId": "62a15ea070b8b30668c28b7f",
          "ContentType": "application/pdf",
          "FileSize": 62965,
          "FileURL": null
        }
      ],
      "FormData": {
        "General": {
          "ApplicantInfo": {
            "ApplicantType": "มอบอำนาจให้ผู้อื่นดำเนินการแทน"
          },
          "ShopInfo": {
            "ShopNameTH": "อิ่มจังตังค์อยู่ครบ-45",
            "ShopNameEN": "AAA-d-d-c-c",
            "ShopAddress": {
              "AddressNo": "212",
              "BuildingName": "",
              "FloorNo": null,
              "RoomNo": "",
              "VillageNo": "1",
              "Soi": null,
              "Road": "",
              "SubDistrict": "บางกระสอ",
              "District": "เมืองนนทบุรี",
              "Province": "นนทบุรี",
              "PostCode": "11000",
              "GeoCode": "120104",
              "Latitude": "13.7605358",
              "Longitude": "100.5267991",
              "Contacts": [
                {
                  "ContactType": "Telephone",
                  "ContactDetail": "0895171685"
                },
                {
                  "ContactType": "Fax",
                  "ContactDetail": ""
                },
                {
                  "ContactType": "Email",
                  "ContactDetail": ""
                },
                {
                  "ContactType": "Mobile",
                  "ContactDetail": ""
                }
              ]
            },
            "ShopTelephone": "0895171685",
            "ShopFax": "",
            "ShopEmail": "",
            "ShopLatLong": "13.7605358,100.5267991",
            "Area": 199,
            "OwnershipType": "เช่าอาคารสถานที่ผู้อื่น (ผู้ให้เช่า/ให้ใช้สถานที่ : นิติบุคคล)"
          }
        },
        "SaleCollectionInfo": {
          "SaleCollectionData": {
            "ApplicationType": "หนังสือรับรองการแจ้ง",
            "LicenseType": "หนังสือรับรองการแจ้ง",
            "ShopType": "สถานที่จำหน่ายอาหาร",
            "Purpose": "สถานที่จำหน่ายอาหาร",
            "FoodType": "อาหารไทย จีน ฝรั่ง มะพร้าว องุ่น สตอเบอรี่"
          },
          "ShopCrewsData": [
            {
              "ShopCrews_Name": "นายพล จัตวา",
              "ShopCrews_Position": "พ่อครัว"
            },
            {
              "ShopCrews_Name": "นางแต๋น จัตวา",
              "ShopCrews_Position": "แม่ครัว"
            },
            {
              "ShopCrews_Name": "นางสาวแองจาลีน่า โจลี",
              "ShopCrews_Position": "พนักงาน"
            },
            {
              "ShopCrews_Name": "นายหม่อง ทองดี",
              "ShopCrews_Position": "พนักงานเตรียมอาหาร"
            }
          ],
          "ShopManagerData": {
            "ShopManager": "นายหม่อง คอยองลง",
            "ShopManagerAge": 44,
            "ShopManagerNationality": "พม่า",
            "ShopManagerAddress": {
              "AddressNo": "33",
              "BuildingName": "-",
              "FloorNo": null,
              "RoomNo": null,
              "VillageNo": "3",
              "Soi": "3",
              "Road": "",
              "SubDistrict": "ปากคลองบางปลากด",
              "District": "พระสมุทรเจดีย์",
              "Province": "สมุทรปราการ",
              "PostCode": null,
              "GeoCode": null,
              "Latitude": "",
              "Longitude": "",
              "Contacts": [
                {
                  "ContactType": "Telephone",
                  "ContactDetail": "0981111112"
                },
                {
                  "ContactType": "Fax",
                  "ContactDetail": ""
                }
              ]
            },
            "ShopManagerTelephone": "0981111112"
          }
        }
      }
    }
  ],
  "message": null
}
``` 

Response Parameters

| รายการข้อมูล | รายละเอียด |
| --- | --- |
| lastSyncDate	| วันที่ดึงข้อมูลล่าสุด (format datetime UTC) เช่น 2021-09-27T06:18:16.211Z |
| status | สถานะปัจจุบัน |
| results | (Array) ข้อมูลคำร้อง ประกอบด้วย
| Id | ID ของใบคำร้อง |
| Service | ข้อมูลทั่วไปของบริการ ประกอบด้วย |
| ServiceId	| รหัสบริการ |
| ServiceName | ชื่อบริการ |
| Version | เวอร์ชัน |
| Owner	| ชื่อหน่วยงานเจ้าของบริการ |
| Applicant	| ข้อมูล Profile ของผู้ยื่นคำขอ ประกอบด้วย |
| CitizenId	| เลขประจำตัวประชาชน |
| Title	| คำนำหน้าชื่อ |
| FirstName | ชื่อจริง | 
| MiddleName | ชื่อกลาง | 
| LastName | นามสกุล | 
| FullName | ชื่อ นามสกุล (แบบเต็ม) | 
| Email	 | |
| Address | ที่อยู่ตามบัตรประชาชน ประกอบด้วย | 
| AddressNo	| บ้านเลขที่ | 
| BuildingName | ชื่ออาคาร/ชื่อหมู่บ้าน | 
| FloorNo | ชั้นที่ | 
| RoomNo | ห้องที่ | 
| VillageNo	| หมู่ที่ | 
| Soi | ซอย | 
| Road	| ถนน | 
| SubDistrict | ตำบล/แขวง | 
| District	| อำเภอ/เขต | 
| Province |	จังหวัด |
| PostCode	 | รหัสไปรษณีย์ |
| GeoCode	 | รหัส GeoCode |
| Latitude | ละติจูด |
| Longitude |	ลองจิจูด |
| Contacts	| (array)ข้อมูลสำหรับติดต่อ |
| ContactType | ประเภท  |
| ContactDetail	ข้อมูล
| ContactAddress | ที่อยู่ที่ติดต่อได้ ประกอบด้วย |
| AddressNo	| บ้านเลขที่ |
| BuildingName | ชื่ออาคาร/ชื่อหมู่บ้าน |
| FloorNo | ชั้นที่ |
| RoomNo | 	ห้องที่
| VillageNo | 	หมู่ที่
| Soi | 	ซอย
| Road | 	ถนน
| SubDistrict | 	ตำบล/แขวง
| District | 	อำเภอ/เขต
| Province | 	จังหวัด
| PostCode | 	รหัสไปรษณีย์
| GeoCode | 	รหัส GeoCode
| Latitude | 	ละติจูด
| Longitude | 	ลองจิจูด
| Contacts | 	(array)ข้อมูลสำหรับติดต่อ
| ContactType | 	ประเภท
| ContactDetail | 	ข้อมูล
| Religion | 	ศาสนา เช่น "พุทธ"
| Nationality | 	สัญชาติ เช่น "ไทย"
| Age | 	อายุ เช่น 40
| SubmitDate | 	วันที่ยื่นคำร้อง (format datetime UTC) เช่น 2021-09-27T06:18:16.211Z
| ReceiveDate | 	วันที่เจ้าหน้ารับคำร้อง (format datetime UTC) เช่น 2021-09-27T06:18:46.085Z
| ReceiveNo | 	เลขที่รับคำร้อง
| ApplicationNo | 	เลขที่คำร้องอ้างอิง จากระบบต้นทาง
| Address | 	ข้อมูลพื้นที่ดำเนินการ/สถานประกอบการ/พื้นที่ที่ผลิต เพาะปลูกที่อยู่ที่ติดต่อได้ ประกอบด้วย
| AddressNo | 	บ้านเลขที่
| BuildingName | 	ชื่ออาคาร/ชื่อหมู่บ้าน
| FloorNo | 	ชั้นที่
| RoomNo | 	ห้องที่
| VillageNo | 	หมู่ที่
| Soi | 	ซอย
| Road | 	ถนน
| SubDistrict | 	ตำบล/แขวง
| District | 	อำเภอ/เขต
| Province | 	จังหวัด
| PostCode | 	รหัสไปรษณีย์
| GeoCode | 	รหัส GeoCode
| Latitude | 	ละติจูด
| Longitude | 	ลองจิจูด
| Contacts | 	(array)ข้อมูลสำหรับติดต่อ
| ContactType | 	ประเภท
| ContactDetail | 	ข้อมูล
| FormData | 	(Object) รายละเอียดคำร้อง ขึ้นอยู่กับโครงสร้างข้อมูลของแต่ละบริการ
| FinishDate | 	วันที่เจ้าหน้าที่ดำเนินการเสร็จสิ้น (format datetime UTC) เช่น 2021-09-27T06:18:16.211Z
| Licenses | 	(Array) ข้อมูลใบอนุญาต ประกอบด้วย
| Type | 	ประเภทใบอนุญาต เช่น "ใบอนุญาต" หรือ "หนังสือรับรอง"
| LicenseNo | 	เลขที่ใบอนุญาต 
| IssueDate | 	วันที่ออกใบอนุญาต (Nullable) (เช่น 2021-09-26T17:00:00Z)
| ExpiryDate | 	วันที่ใบอนุญาตหมดอายุ (Nullable) (เช่น 2022-10-25T17:00:00Z)
| EffectiveDate | 	วันที่มีผลบังคับใช้ (Nullable)
| FileName | 	ชื่อไฟล์ หรือชื่อใบอนุญาต
| FileId | 	 ID ของไฟล์ (ใช้สำหรับดึงไฟล์ที่จัดเก็บในระบบ FileServer )
| FileSize | 	ขนาดไฟล์ (Bytes)
| FileContentType | 	ชนิดของไฟล์ (.jpg, jpeg, .png, .gif, .bmp, .pdf)
| DocumentID | 	รหัส Document ใช้สำหรับใช้งานในระบบ e-Doc Signing
| IssueBy | 	หน่วยงานที่ออกใบอนุญาต
| ApplicationAttachments | 	(Array) ข้อมูลไฟล์แนบของผู้ยื่น ประกอบด้วย
| DocName | 	ชื่อเอกสารแนบ
| FileName | 	ชื่อไฟล์
| FileId | 	ID ของไฟล์ (ใช้สำหรับดึงไฟล์ที่จัดเก็บในระบบ FileServer )
| FileContentType | 	ชนิดของไฟล์ (application/pdf)
| FileSize | ขนาดไฟล์ (Bytes)
| FileUrl | กรณีเป็นการแนบไฟล์เอกสารจากภายนอก
| message | |
  
