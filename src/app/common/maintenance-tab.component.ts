import { Component, Input } from '@angular/core';

@Component({
    selector:'maintenance-tab',
    templateUrl: 'maintenance-tab.component.html'
})
export class MaintenanceTabComponent {
    @Input() title:string;

    sortedData = [
        {
            "RowNum": 1,
            "jobId": 26,
            "jobName": "Computer Specialist",
            "company": "INVID",
            "city": "San Juan",
            "country": "United States",
            "jobCategory": "Information Technology",
            "jobType": "Part-Time",
            "jobStatus": "Hiring",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing",
            "createdDate": "2018-09-18T15:06:01.053"
        },
        {
            "RowNum": 2,
            "jobId": 25,
            "jobName": "Customer Service Specialist",
            "company": "INVID",
            "city": "San Juan",
            "country": "United States",
            "jobCategory": "Customer Service",
            "jobType": "Part-Time",
            "jobStatus": "Hiring",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget tempor tellus. Mauris nisl sem, volutpat at nulla ut, ultricies ornare libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin tristique in purus quis consequat. Nulla non lorem ultricies leo imperdiet aliquam. Morbi in ligula risus. Sed nunc tortor, congue eu sodales vel, mollis eget justo. Aliquam velit velit, suscipit vel posuere nec, rhoncus ac risus. Nullam malesuada facilisis magna vitae ornare. Nullam non nunc elementum, egestas tellus sed, viverra est. Cras consequat ipsum vel dui viverra, mollis rhoncus erat convallis. Cras tempus dui ut magna mollis, ut feugiat ante tempor. Mauris felis velit, euismod in aliquam et, porta sit amet mi. Morbi tincidunt ultricies dolor et sagittis. Mauris nunc nisi, iaculis ac leo at, gravida tincidunt ex. Curabitur lobortis massa interdum ante fringilla viverra.",
            "createdDate": "2018-09-18T15:04:12.147"
        },
        {
            "RowNum": 3,
            "jobId": 22,
            "jobName": "Secretary",
            "company": "INVID",
            "city": "San Juan",
            "country": "United States",
            "jobCategory": "Customer Service",
            "jobType": "Part-Time",
            "jobStatus": "Hiring",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget tempor tellus. Mauris nisl sem, volutpat at nulla ut, ultricies ornare libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin tristique in purus quis consequat. Nulla non lorem ultricies leo imperdiet aliquam. Morbi in ligula risus. Sed nunc tortor, congue eu sodales vel, mollis eget justo. Aliquam velit velit, suscipit vel posuere nec, rhoncus ac risus. Nullam malesuada facilisis magna vitae ornare. Nullam non nunc elementum, egestas tellus sed, viverra est. Cras consequat ipsum vel dui viverra, mollis rhoncus erat convallis. Cras tempus dui ut magna mollis, ut feugiat ante tempor. Mauris felis velit, euismod in aliquam et, porta sit amet mi. Morbi tincidunt ultricies dolor et sagittis. Mauris nunc nisi, iaculis ac leo at, gravida tincidunt ex. Curabitur lobortis massa interdum ante fringilla viverra.",
            "createdDate": "2018-09-12T17:50:09.3"
        },
        {
            "RowNum": 4,
            "jobId": 18,
            "jobName": "Technician",
            "company": "INVID",
            "city": "San Juan",
            "country": "United States",
            "jobCategory": "Information Technology",
            "jobType": "Part-Time",
            "jobStatus": "Hiring",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget tempor tellus. Mauris nisl sem, volutpat at nulla ut, ultricies ornare libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin tristique in purus quis consequat. Nulla non lorem ultricies leo imperdiet aliquam. Morbi in ligula risus. Sed nunc tortor, congue eu sodales vel, mollis eget justo. Aliquam velit velit, suscipit vel posuere nec, rhoncus ac risus. Nullam malesuada facilisis magna vitae ornare. Nullam non nunc elementum, egestas tellus sed, viverra est. Cras consequat ipsum vel dui viverra, mollis rhoncus erat convallis. Cras tempus dui ut magna mollis, ut feugiat ante tempor. Mauris felis velit, euismod in aliquam et, porta sit amet mi. Morbi tincidunt ultricies dolor et sagittis. Mauris nunc nisi, iaculis ac leo at, gravida tincidunt ex. Curabitur lobortis massa interdum ante fringilla viverra.",
            "createdDate": "2018-09-12T17:29:12.127"
        },
        {
            "RowNum": 5,
            "jobId": 17,
            "jobName": "Inventory",
            "company": "INVID",
            "city": "San Juan",
            "country": "United States",
            "jobCategory": "Customer Service",
            "jobType": "Part-Time",
            "jobStatus": "Hiring",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget tempor tellus. Mauris nisl sem, volutpat at nulla ut, ultricies ornare libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin tristique in purus quis consequat. Nulla non lorem ultricies leo imperdiet aliquam. Morbi in ligula risus. Sed nunc tortor, congue eu sodales vel, mollis eget justo. Aliquam velit velit, suscipit vel posuere nec, rhoncus ac risus. Nullam malesuada facilisis magna vitae ornare. Nullam non nunc elementum, egestas tellus sed, viverra est. Cras consequat ipsum vel dui viverra, mollis rhoncus erat convallis. Cras tempus dui ut magna mollis, ut feugiat ante tempor. Mauris felis velit, euismod in aliquam et, porta sit amet mi. Morbi tincidunt ultricies dolor et sagittis. Mauris nunc nisi, iaculis ac leo at, gravida tincidunt ex. Curabitur lobortis massa interdum ante fringilla viverra.",
            "createdDate": "2018-09-10T15:50:39.983"
        },
        {
            "RowNum": 6,
            "jobId": 16,
            "jobName": "Customer Service Specialist",
            "company": "INVID",
            "city": "San Juan",
            "country": "United States",
            "jobCategory": "Customer Service",
            "jobType": "Full-Time",
            "jobStatus": "Hiring",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget tempor tellus. Mauris nisl sem, volutpat at nulla ut, ultricies ornare libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin tristique in purus quis consequat. Nulla non lorem ultricies leo imperdiet aliquam. Morbi in ligula risus. Sed nunc tortor, congue eu sodales vel, mollis eget justo. Aliquam velit velit, suscipit vel posuere nec, rhoncus ac risus. Nullam malesuada facilisis magna vitae ornare. Nullam non nunc elementum, egestas tellus sed, viverra est. Cras consequat ipsum vel dui viverra, mollis rhoncus erat convallis. Cras tempus dui ut magna mollis, ut feugiat ante tempor. Mauris felis velit, euismod in aliquam et, porta sit amet mi. Morbi tincidunt ultricies dolor et sagittis. Mauris nunc nisi, iaculis ac leo at, gravida tincidunt ex. Curabitur lobortis massa interdum ante fringilla viverra.",
            "createdDate": "2018-09-10T15:50:09.14"
        },
        {
            "RowNum": 7,
            "jobId": 15,
            "jobName": "Customer Service Specialist",
            "company": "INVID",
            "city": "San Juan",
            "country": "United States",
            "jobCategory": "Customer Service",
            "jobType": "Part-Time",
            "jobStatus": "Hiring",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget tempor tellus. Mauris nisl sem, volutpat at nulla ut, ultricies ornare libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin tristique in purus quis consequat. Nulla non lorem ultricies leo imperdiet aliquam. Morbi in ligula risus. Sed nunc tortor, congue eu sodales vel, mollis eget justo. Aliquam velit velit, suscipit vel posuere nec, rhoncus ac risus. Nullam malesuada facilisis magna vitae ornare. Nullam non nunc elementum, egestas tellus sed, viverra est. Cras consequat ipsum vel dui viverra, mollis rhoncus erat convallis. Cras tempus dui ut magna mollis, ut feugiat ante tempor. Mauris felis velit, euismod in aliquam et, porta sit amet mi. Morbi tincidunt ultricies dolor et sagittis. Mauris nunc nisi, iaculis ac leo at, gravida tincidunt ex. Curabitur lobortis massa interdum ante fringilla viverra.",
            "createdDate": "2018-09-10T15:49:54.903"
        },
        {
            "RowNum": 8,
            "jobId": 11,
            "jobName": "IT Technician",
            "company": "INVID",
            "city": "San Juan",
            "country": "United States",
            "jobCategory": "Information Technology",
            "jobType": "Part-Time",
            "jobStatus": "Hiring",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget tempor tellus. Mauris nisl sem, volutpat at nulla ut, ultricies ornare libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin tristique in purus quis consequat. Nulla non lorem ultricies leo imperdiet aliquam. Morbi in ligula risus. Sed nunc tortor, congue eu sodales vel, mollis eget justo. Aliquam velit velit, suscipit vel posuere nec, rhoncus ac risus. Nullam malesuada facilisis magna vitae ornare. Nullam non nunc elementum, egestas tellus sed, viverra est. Cras consequat ipsum vel dui viverra, mollis rhoncus erat convallis. Cras tempus dui ut magna mollis, ut feugiat ante tempor. Mauris felis velit, euismod in aliquam et, porta sit amet mi. Morbi tincidunt ultricies dolor et sagittis. Mauris nunc nisi, iaculis ac leo at, gravida tincidunt ex. Curabitur lobortis massa interdum ante fringilla viverra.",
            "createdDate": "2018-09-10T15:47:08.45"
        },
        {
            "RowNum": 9,
            "jobId": 9,
            "jobName": "Programmer",
            "company": "INVID",
            "city": "San Juan",
            "country": "United States",
            "jobCategory": "Information Technology",
            "jobType": "Full-Time",
            "jobStatus": "Hiring",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget tempor tellus. Mauris nisl sem, volutpat at nulla ut, ultricies ornare libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin tristique in purus quis consequat. Nulla non lorem ultricies leo imperdiet aliquam. Morbi in ligula risus. Sed nunc tortor, congue eu sodales vel, mollis eget justo. Aliquam velit velit, suscipit vel posuere nec, rhoncus ac risus. Nullam malesuada facilisis magna vitae ornare. Nullam non nunc elementum, egestas tellus sed, viverra est. Cras consequat ipsum vel dui viverra, mollis rhoncus erat convallis. Cras tempus dui ut magna mollis, ut feugiat ante tempor. Mauris felis velit, euismod in aliquam et, porta sit amet mi. Morbi tincidunt ultricies dolor et sagittis. Mauris nunc nisi, iaculis ac leo at, gravida tincidunt ex. Curabitur lobortis massa interdum ante fringilla viverra.",
            "createdDate": "2018-09-07T15:16:34.11"
        },
        {
            "RowNum": 10,
            "jobId": 6,
            "jobName": "Assistant Manager",
            "company": "INVID",
            "city": "San Juan",
            "country": "United States",
            "jobCategory": "Customer Service",
            "jobType": "Full-Time",
            "jobStatus": "Hiring",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget tempor tellus. Mauris nisl sem, volutpat at nulla ut, ultricies ornare libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin tristique in purus quis consequat. Nulla non lorem ultricies leo imperdiet aliquam. Morbi in ligula risus. Sed nunc tortor, congue eu sodales vel, mollis eget justo. Aliquam velit velit, suscipit vel posuere nec, rhoncus ac risus. Nullam malesuada facilisis magna vitae ornare. Nullam non nunc elementum, egestas tellus sed, viverra est. Cras consequat ipsum vel dui viverra, mollis rhoncus erat convallis. Cras tempus dui ut magna mollis, ut feugiat ante tempor. Mauris felis velit, euismod in aliquam et, porta sit amet mi. Morbi tincidunt ultricies dolor et sagittis. Mauris nunc nisi, iaculis ac leo at, gravida tincidunt ex. Curabitur lobortis massa interdum ante fringilla viverra.",
            "createdDate": "2018-09-04T16:01:41.583"
        }
    ]

}
