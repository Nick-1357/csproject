/* eslint-disable */
import Vue from 'vue'
import moment from "moment";
Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString().toLowerCase()
    const arr = value.split(' ')
    const capitalized_array = []
    arr.forEach((word) => {
        const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
        capitalized_array.push(capitalized)
    })
    return capitalized_array.join(' ')
})

Vue.filter("lan", (value) => {
    if (value == "en") {
        return "English";
    }
    else if (value == "tl") {
        return "Filipino";
    }
    else if (value == "ms") {
        return "Bahasa Malaysia";
    }
    else if (value == "vi") {
        return "Vietnamese";
    }
    else if (value == "zh-CN") {
        return "Chinese (Simplified)";
    }
    else if (value == "ja") {
        return "Japanese";
    }


    else if (value == "ar") {
        return "العربية";
    }
    else if (value == "it") {
        return "Italian";
    }
    else if (value == "fr") {
        return "French";
    }
    else if (value == "de") {
        return "German";
    }
    else if (value == "pt") {
        return "Portuguese";
    }
    else if (value == "es") {
        return "Spanish";
    }
    else {
        return value
    }

})

Vue.filter("loc", (value) => {
    if (value == "www.google.com" || value == "com") {
        return "United States";
    }
    else if (value == "www.google.com.my" || value == "my") {
        return "Malaysia";
    }
    else if (value == "www.google.com.au" || value == "au") {
        return "Australia";
    }
    else if (value == "www.google.com.sg" || value == "sg") {
        return "Singapore";
    }
    else if (value == "www.google.ca" || value == "ca") {
        return "Canada";
    }
    else if (value == "www.google.com.vn" || value == "vn") {
        return "Vietnam";
    }
    else if (value == "www.google.com.tw" || value == "tw") {
        return "Taiwan";
    }
    else if (value == "www.google.co.id" || value == "id") {
        return "Indonesia";
    }
    else if (value == "www.google.co.th" || value == "th") {
        return "Thailand";
    }
    else if (value == "www.google.ae" || value == "ae") {
        return "United Arab Emirates";
    }

    else {
        return value;
    }


});

Vue.filter("formatDate", (value) => {
    if (value) {
        return moment(String(value)).format("MM/DD/YYYY");
    }
});


Vue.filter("project_name", (value) => {
    if (value == null || value == undefined) {
        return value
    }
    else {

        var name = []

        JSON.parse(localStorage.nexrank_client).forEach(element => {

            if (element.id == value) {
                name = element.name
            }
        })

        return name
    }

});


Vue.filter("cross_name", (value) => {
    if (value == "keyword_query") {
        return "Keyword Discovery";
    }
    else if (value == "keywords-query") {
        return "Keyword Discovery";
    }
    else if (value == "keywordQuery") {
        return "Keyword Discovery";
    }
    else if (value == "clientsCampaigns") {
        return "Keyword Analyzer";
    }
    else if (value == "PageSpeed") {
        return "Page speed Insight";
    }
    else if (value == "websiteScanner") {
        return "Content Optimizer";
    }
    else if (value == "Content-Generation-Campaigns") {
        return "Content Generator";
    }
    else if (value == "Nexwriter") {
        return "AI Content Generator";
    }
    else if (value == "nexWriter") {
        return "AI Content Generator";
    }
    else if (value == "Nexwriter-Campaigns") {
        return "AI Content Generator";
    }
    else if (value == "Seo-Automation") {
        return "AI SEO Automation";
    }
    else if (value == "nexAutomate") {
        return "AI SEO Automation";
    }
    else if (value == "New-Content-Generation-Campaigns") {
        return "Content Generator";
    }
    else if (value == "PageSpeedCheck") {
        return "Page Speed Insight";
    }
    else if (value == "indexability") {
        return "Enterprise SEO";
    }
    else {
        return value;
    }

});

Vue.filter("crawl_input", (value) => {
    if (value == "max_url") {
        return "Maximum URL";
    }
    else if (value == "depth_limit") {
        return "Max Depth";
    }
    else if (value == "max_speed") {
        return "Crawling Speed";
    }
    else if (value == "user_agent") {
        return "Bot Name";
    }
    else if (value == "follow_links") {
        return "Follow links";
    }
    else if (value == "follow_http_redirect") {
        return "Follow HTTP redirects (3xx)";
    } else if (value == "follow_alternates") {
        return "Follow alternates";
    } else if (value == "follow_canonicals") {
        return "Follow canonicals";
    } else if (value == "allow_nofollow") {
        return "Allow nofollow";
    } else if (value == "allow_noindex") {
        return "Allow noindex";
    } else if (value == "allow_4xx_5xx_links") {
        return "Allow links from 4xx and 5xx pages";
    }
    else if (value == "sitemaps_urls") {
        return "Sitemaps URLs";
    }
    else if (value == "company_name") {
        return "Company Name";
    }
    else {
        return value;
    }



});



Vue.filter("plans", (value) => {
    if (value == "nexodn_basic") {
        return "NexODN Basic";
    }
    else if (value == "nexodn_business") {
        return "NexODN business";
    }
    else if (value == "nex_writer_basic") {
        return "NexWriter Basic";
    }
    else if (value == "nex_writer_business") {
        return "NexWriter Business";
    }
    else if (value == "nexodn_free_trail") {
        return "NexODN Free Trail";
    }

    else if (value == "nex_writer_starter") {
        return "NexWriter Starter";
    }
    else if (value == "nexWriter_premium") {
        return "NexWriter Premium";
    }
    else if (value == "nexWriter_standard") {
        return "NexWriter Standard";
    }

    else if (value == "nexwriter_starter") {
        return "NexWriter Starter";
    }

    else if (value == "nex_writer_starter_old") {
        return "NexWriter Starter Old";
    }

    else if (value == "nexodn_basic_old") {
        return "NexODN Basic Old";
    }

    else if (value == 'nex_writer_basic_old') {
        return "NexWriter Basic Old";
    }
    else if (value == "NexWriter_Pro") {
        return "NexWriter Pro";
    }
    else if (value == "NexWriter_Bussiness") {
        return "NexWriter Business";
    }
    else if (value == "NexWriter_Basic") {
        return "NexWriter Basic";
    }

    else if (value == "NexAutomate_Basic") {
        return "NexAutomate Basic";
    }


    else if (value == "NexAutomate_Pro") {
        return "NexAutomate Pro";
    }

    else if (value == "NexAutomate_Business") {
        return "NexAutomate Business";
    }

    else {
        return value;
    }









});


Vue.filter("variant", (value) => {
    if (value == "sessions") {
        return "Sessions";
    }
    else if (value == "avg_time") {
        return "Average Time";
    }
    else if (value == "max_time") {
        return "Maximum Time";
    }
    else if (value == "min_time") {
        return "Minimum Time";
    }
    else {
        return value;
    }



});

Vue.filter("crawl_category", (value) => {
    if (value == "meta_category") {
        return "Meta Category";
    }
    else if (value == "duplicate_category") {
        return "Duplicate Category";
    }
    else if (value == "content_category") {
        return "Content Category";
    }

    else {
        return value;
    }



});



Vue.filter("formatDate2", (value) => {
    if (value) {
        return moment(String(value)).format('YYYY-MM-DD')
    }
});

//https://stackoverflow.com/questions/39634222/is-there-a-way-to-remove-proper-nouns-from-a-sentence-using-python
Vue.filter('title', function (value, replacer = '_') {
    if (!value) return ''
    value = value.toString()

    const arr = value.split(replacer)
    const capitalized_array = []
    arr.forEach((word) => {
        const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
        capitalized_array.push(capitalized)
    })
    return capitalized_array.join(' ')
})

Vue.filter('truncate', function (value, limit) {
    return value.substring(0, limit)
})

Vue.filter('tailing', function (value, tail) {
    return value + tail
})


Vue.filter('handler', function (value) {
    if (!value) return 'SYSTEM'
    else return value.name
})

Vue.filter('nexrank', function (value) {
    if (value === 'title') return 'Title'
    else if (value === 'description') return 'Description'
    if (value === 'webtitle') return 'Title'
    else if (value === 'webdesc') return 'Description'
    else if (value === 'h1') return 'Header 1'
    else if (value === 'h2') return 'Header 2'
    else if (value === 'h3') return 'Header 3'
    else if (value === 'h4') return 'Header 4'
    else if (value === 'h5') return 'Header 5'
    else if (value === 'h6') return 'Header 6'
    else if (value === 'h7') return 'Header 7'
    else if (value === 'li') return 'List'
    else if (value === 'lists') return 'List'
    else if (value === 'url') return 'URL'
    else if (value === 'p') return 'Paragraph'
    else { return value }
})

Vue.filter('decimal', function (value) {
    if (isNaN(value))
        return value.toFixed(2);
    else
        return value
})

Vue.filter('time', function (value, is24HrFormat = false) {
    if (value) {
        const date = new Date(Date.parse(value))
        let hours = date.getHours()
        const min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
        if (!is24HrFormat) {
            const time = hours > 12 ? 'AM' : 'PM'
            hours = hours % 12 || 12
            return `${hours}:${min} ${time}`
        }
        return `${hours}:${min}`
    }
})

Vue.filter('date', function (value, fullDate = false) {
    value = String(value)
    const date = value.slice(8, 10).trim()
    const month = value.slice(4, 7).trim()
    const year = value.slice(11, 15)

    if (!fullDate) return `${date} ${month}`
    else return `${date} ${month} ${year}`
})

Vue.filter('dateformat', function (value, fullDate = false) {
    value = String(value)
    const date = value.slice(8, 10).trim()
    const month = value.slice(4, 8).trim()
    const year = value.slice(0, 4).trim()
    return `${date} ${month} ${year}`
})

Vue.filter('month', function (val, showYear = true) {
    val = String(val)

    const regx = /\w+\s(\w+)\s\d+\s(\d+)./
    if (!showYear) {
        return regx.exec(val)[1]
    } else {
        return `${regx.exec(val)[1]} ${regx.exec(val)[2]}`
    }

})

Vue.filter('csv', function (value) {
    return value.join(', ')
})

Vue.filter('sys', function (value) {
    if (value == 1)
        return 'NO'
    return 'YES'
})

Vue.filter('status', function (value) {
    if (value == 1)
        return 'Active'
    return 'Deactivated'
})

Vue.filter('active', function (value) {
    if (value === 1)
        return 'Active'
    return 'Inactive'
})
Vue.filter('dataImg', function (string) {
    if (string.includes('.png') || string.includes('.jpg') || string.includes('.jpeg'))
        return string
    return '@/assets/images/portrait/small/fileplaceholder.jpg'
})

Vue.filter('icon', function (value) {
    if (value === 'Lunch')
        return 'LayoutIcon'
    else if (value === 'Mailing')
        return 'MailIcon'
    else if (value === 'Calling')
        return 'PhoneIcon'
    else if (value === 'Meeting')
        return 'UsersIcon'
    return 'PlusIcon'
})

Vue.filter('bg', function (value) {
    if (value === 'Lunch')
        return 'bg-danger'
    else if (value === 'Mailing')
        return 'bg-warning'
    else if (value === 'Calling')
        return 'bg-primary'
    else if (value === 'Meeting')
        return 'bg-success'
    return 'bg-info'
})

Vue.filter('slug', function (value) {
    if (value === 'Client-Staff.index')
        return 'VIEW ALL CLIENT STAFF'
    else if (value === 'Client-Staff.store')
        return 'CREATE NEW CLIENT STAFF'
    else if (value === 'Client-Staff.show')
        return 'VIEW CLIENT STAFF'
    else if (value === 'Client-Staff.update')
        return 'UPDATE CLIENT STAFF'
    else if (value === 'Client-Staff.destroy')
        return 'DELETE CLIENT STAFF'
    else if (value === 'Client-Staff.active')
        return 'ACTIVATE CLIENT STAFF'
    else if (value === 'Role-Client-Manager.index')
        return 'VIEW ROLE CLIENT MANAGER'
    else if (value === 'Role-Client-Manager.store')
        return 'STORE ROLE CLIENT MANAGER'
    else if (value === 'Role-Client-Manager.show')
        return 'SHOW ROLE CLIENT MANAGER'
    else if (value === 'Role-Client-Manager.update')
        return 'UPDATE ROLE CLIENT MANAGER'
    else if (value === 'Role-Client-Manager.destroy')
        return 'REMOVE ROLE CLIENT MANAGER'
    else if (value === 'Inquiry.index')
        return 'VIEW INQUIRY'
    else if (value === 'Inquiry.show')
        return 'VIEW INQUIRY'
    else if (value === 'Inquiry.update')
        return 'UPDATE INQUIRY'
    else if (value === 'Inquiry.destroy')
        return 'DELETE INQUIRY'
    else if (value === 'Inquiry.store')
        return 'CREATE  INQUIRY'
    else if (value === 'Move-Inquiry')
        return 'MOVE INQUIRY'
    else if (value === 'Inquiry.Notes.index')
        return 'SHOW ALL INQUIRY NOTES'
    else if (value === 'Inquiry.Notes.show')
        return 'SHOW ONE INQUIRY NOTES'
    else if (value === 'Inquiry.Notes.update')
        return 'UPDATE INQUIRY NOTES'
    else if (value === 'Inquiry.Notes.destroy')
        return 'DELETE INQUIRY NOTES'
    else if (value === 'Inquiry.Notes.store')
        return 'CREATE NEW INQUIRY NOTES'
    else if (value === 'Note.Attachments.index')
        return 'VIE ALL NOTE ATTACHMENTS'
    else if (value === 'Note.Attachments.store')
        return 'CREATE NEW NOTE ATTACHMENTS'
    else if (value === 'Note.Attachments.update')
        return 'UPDATE NOTE ATTACHMENTS'
    else if (value === 'Note.Attachments.destroy')
        return 'DELETE NOTE ATTACHMENTS'
    else if (value === 'Note.Attachments.show')
        return 'VIEW  SPECIFIC NOTE ATTACHMENTS'
    else if (value === 'Inquiry.Events.index')
        return 'VIEW ALL INQUIRY EVENT'
    else if (value === 'Inquiry.Events.show')
        return 'SHOW SPESIFIC INQUIRY EVENT'
    else if (value === 'Inquiry.Events.update')
        return 'UPDATE INQUIRY EVENT'
    else if (value === 'Inquiry.Events.store')
        return 'CREATE NEW INQUIRY EVENT'
    else if (value === 'Inquiry.Events.destroy')
        return 'DELETE INQUIRY EVENT'
    else if (value === 'Inquiry-Category.index')
        return 'VIEW ALL INQUIRY CATEGORY'
    else if (value === 'Inquiry-Category.show')
        return 'SHOW SPESIFIC INQUIRY CATEGORY'
    else if (value === 'Inquiry-Category.update')
        return 'UPDATE INQUIRY CATEGORY'
    else if (value === 'Inquiry-Category.store')
        return 'CREATE NEW INQUIRY CATEGORY'
    else if (value === 'Inquiry-Category.destroy')
        return 'DELETE INQUIRY CATEGORY'
    else if (value === 'Inquiry-Category.Inquiry-Step-Category.index')
        return 'VIEW INQUIRY CATEGORY STEPS'
    else if (value === 'Inquiry-Category.Inquiry-Step-Category.store')
        return 'CREATE INQUIRY CATEGORY STEPS'
    else if (value === 'Inquiry-Step-Category.show')
        return ' VIEW  INQUIRY CATEGORY STEPS'
    else if (value === 'Inquiry-Step-Category.update')
        return 'UPDATE INQUIRY CATEGORY STEPS'
    else if (value === 'Inquiry-Step-Category.destroy')
        return 'DELETE INQUIRY CATEGORY STEPS'
    else if (value === 'Change-Inquiry-Step-Order.change_order')
        return 'CHANGE INQUIRY CATEGORY STEPS ORDER'
    else
        return value
})

Vue.filter('filter_tags', function (value) {
    return value.replace(/<\/?[^>]+(>|$)/g, '')
})

Vue.filter('k_formatter', function (num) {
    return num > 999 ? `${(num / 1000).toFixed(1)}k` : num
})