const express = require('express');
const router = express.Router();
// const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const axios = require('axios');
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
const log = console.log;


//=================================
//             Data
//=================================

router.get("/ytn", auth, (req, res) => {
    const getData = async () => {
        try {
            const html = await axios.get("https://www.yna.co.kr/sports/all");
            let ulList = [];
            const $ = cheerio.load(html.data);
            const $bodyList = $("div.list-type038 ul li").children("div.item-box01");

            $bodyList.each(function (i, elem) {
                ulList[i] = {
                    title: $(this).find('div.news-con a.tit-wrap strong.tit-news').text(),
                    url: $(this).find('div.news-con a.tit-wrap').attr('href'),
                    image_url: $(this).find('figure.img-con a img').attr('src'),
                    image_alt: $(this).find('figure.img-con a img').attr('alt'),
                    summary: $(this).find('p.lead').text().slice(0, -11),
                    date: $(this).find('div.info-box01 span.txt-time').text()
                };
            });

            const data = ulList.filter(n => n.title);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    return getData()
        .then(data => {
            if (data) {
                return res.status(200).json({
                    fetchSuccess: true,
                    data: data,
                });
            }
            else {
                return res.status(400).json({
                    fetchSuccess: false,
                });
            }
        })
});

router.post("/saramin", auth, (req, res) => {
    console.log('사람인 라우터 들어옴 : ' + req.body.loc_mcd + ' ' + req.body.sal_min + ' ' + req.body.searchword)
    const getData = async () => {
        try {
            const URL = `https://www.saramin.co.kr/zf_user/search${req.body.searchword}`  // ex) 소프트웨어+개발자
                + '&searchType=search&company_cd=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C9%2C10'
                + `&loc_mcd=${req.body.loc_mcd}` // ex) 101000
                + `&sal_min=${req.body.sal_min}&keydownAccess=` // ex) 11
                + '&panel_type=&search_optional_item=y&search_done=y&panel_count=y&abType=b';
            console.log('URL : ' + URL);
            const html = await axios.get(URL);
            let divList = [];
            const $ = cheerio.load(html.data);
            const $bodyList = $("#recruit_info_list div.content").children("div.item_recruit");

            $bodyList.each(function (i, elem) {
                divList[i] = {
                    title: $(this).find('div.area_job h2.job_tit a.data_layer span').text(),
                    url: $(this).find('div.area_job h2.job_tit a.data_layer').attr('href'),
                    date: $(this).find('div.area_job div.job_date span.date').text(),
                    condition: $(this).find('div.area_job div.job_condition').text(),
                    sector: $(this).find('div.area_job div.job_sector').text(),
                    corp: $(this).find('div.area_corp strong.corp_name a.track_event.data_layer').text(),
                    affiliate: $(this).find('div.area_corp span.corp_affiliate').text(),
                };
            });

            const data = divList.filter(n => n.title);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    return getData()
        .then(data => {
            if (data) {
                return res.status(200).json({
                    fetchSuccess: true,
                    data: data,
                });
            }
            else {
                return res.status(400).json({
                    fetchSuccess: false,
                });
            }
        })
});

router.post("/jobkorea", auth, (req, res) => {
    console.log('잡코리아 라우터 들어옴 : ' + req.body.local + ' ' + req.body.payMin + ' ' + req.body.stext)
    const getData = async () => {
        try {
            const URL = `https://www.jobkorea.co.kr/Search/?stext=${req.body.stext}` // ex) 소프트웨어%20개발자
                + `&local=${req.body.local}` // ex) I000
                + '&payType=1'
                + `&payMin=${req.body.payMin}`; // ex) 5000
            console.log('URL : ' + URL);
            const html = await axios.get(URL);
            let ulList = [];
            const $ = cheerio.load(html.data);
            const $bodyList = $("div.list-default ul.clear li.list-post").children("div.post");

            $bodyList.each(function (i, elem) {
                ulList[i] = {
                    title: $(this).find('div.post-list-info a.title').text(),
                    url: $(this).find('div.post-list-info a.title').attr('href'),
                    date: $(this).find('div.post-list-info p.option span.date').text(),
                    condition: $(this).find('div.post-list-info p.option').text(),
                    sector: $(this).find('div.post-list-info p.etc').text(),
                    corp: $(this).find('div.post-list-corp a.name').text(),
                };
            });

            const data = ulList.filter(n => n.title);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    return getData()
        .then(data => {
            if (data) {
                return res.status(200).json({
                    fetchSuccess: true,
                    data: data,
                });
            }
            else {
                return res.status(400).json({
                    fetchSuccess: false,
                });
            }
        })
});

module.exports = router;