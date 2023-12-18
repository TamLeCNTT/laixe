import Header from "../../Layout/Header";
import { useState, useEffect } from "react";
import CoHuuService from "../../Service/CoHuuService";
import Paginations from "../../support/Paginations";
// import Cabin_edit from "./Cabin_edit";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import ImPort from "../../support/ImPort";
import GiaoVienService from "../../Service/GiaoVienService";
import CoHuu_Filter from "./CoHuu_Filter";
import CoHuu_Edit from "./CoHuu_Edit";
import Loading from "../../Layout/Loading";
import StudentService from "../../Service/StudentService";
import SessionService from "../../Service/SessionService";

import LocalService from "../../Service/LocalService";
const Cohuu_List = () => {
    const [listcohuu, setlistcohuu] = useState([])
    const [lists, setLists] = useState([])
    const [listch, setlistch] = useState([])
    const [text, settext] = useState('')
    const [date, setdate] = useState()
    const [head, sethead] = useState([])
    const [Loadings, setloadings] = useState(false)
    const [Data, setData] = useState([])
    const [listflag, setlistflag] = useState([])
    // const [listflag, setlistflag] = useState([])
    const [listgv, setlistgv] = useState([])
    const [objfilter, setobjfilter] = useState({})
    let header = [["Ngày dạy", "Tên giáo viên", "Lộ trình", "Số Km ngày", "Số Km đêm", "Tổng số Km"]]
    const users = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    let navitive = useNavigate()
    let flag = 0
    function my_date(date_string) {
        var date_components = date_string.split("-");
        var day = date_components[0];
        var month = date_components[1];
        var year = date_components[2];
        return new Date(year, month - 1, day);
    }
    const setDatas = (list) => {
        let listdata = []
        list.map((item, index) => {
            let e = { ngay: item.ngay, giaovien: item.giaovien, lotrinh: item.lotrinh, sokmngay: item.sokmngay, sokmdem: item.sokmdem, tongkm: Number(item.sokmdem) + Number(item.sokmngay) }

            listdata.push(e)
        })
        setData(listdata)
    }
    const xoa_dau = (str) => {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    }
    const SaveSessionNew = (e) => {
        let listitemstudent = []

        console.log(e)
        e.map((item, index) => {
            listitemstudent.push(item)

            if (index > 0 && (index % 500 == 0 || index >= e.length - 1)) {

                console.log(listitemstudent)

                let listitemstudents = [[]]
                listitemstudents[0] = listitemstudent
                SessionService.addmany(listitemstudents).then(res => {

                    toast.success("Lưu dữ liệu phiên học thành côngs")
                }).catch(err => {
                    toast.error("Dữ liệu lưu không thành công")
                })
                listitemstudent = []

            }
        })


    }
    const ExcelDateToJSDate = (dates) => {
        let date = dates.split("-")

        let day = date[0];
        let month = date[1];

        let year = date[2];
        console.log(year + '-' + month + '-' + day)
        return (year + '-' + month + '-' + day)
    }
    const getlistdata = (e) => {

        console.log(e)
        let list = []
        let listid = []
        e.map((item, index) => {


            if (item.TT == "Khả dụng" && item.soxe.length <= 8) {
                const session = { sessioncode: item.maphienhoc, code: item.mahocvien, course: item.makhoahoc, name: item.tenhocvien, hours: item.thoigian, timenight: 0, distance: item.quangduong, car: item.soxe, datestart: item.thoigianbd, date: ExcelDateToJSDate(item.thoigianbd.substring(0, 10)) }
                const thoigianbd = new Date("01-01-1990 " + (item.thoigianbd).substring(11, 19))
                let thoigian = Number(item.thoigian)

                let hour = Number((item.thoigianbd).substring(11, 13)) + parseInt(thoigian)
                let mini = parseInt((Number((item.thoigianbd).substring(14, 16)) + (thoigian - parseInt(thoigian)) * 60))
                if (mini >= 60) {
                    mini -= 60
                    hour += 1
                }

                let second = (item.thoigianbd).substring(17, 19)
                let tgkt = "01-01-1990 " + hour + ":" + mini + ":" + second
                const thoigiankt = new Date(tgkt)
                if (thoigiankt.getHours() >= 18 || thoigiankt.getHours() == 0 || thoigianbd.getHours() > 18) {
                    if (thoigianbd.getHours() >= 18 || thoigiankt.getHours() <= 6) {
                        session.timenight = Number(item.thoigian)
                    }
                    else {

                        session.timenight = (thoigiankt.getHours() - 18) + (thoigiankt.getMinutes() / 60)

                    }

                }
                else
                    if (thoigianbd.getHours() < 6) {
                        if (thoigiankt.getHours() < 6) {
                            session.timenight = Number(item.thoigian)
                        }
                        else
                            session.timenight = (6 - thoigianbd.getHours()) - ((thoigianbd.getMinutes()) / 60)
                    }

                list.push(session)
            }
            else {
                listid.push("'" + item.maphienhoc + "'")
            }

        })
        if (listid.length > 0)
            SessionService.deletemanyid(listid).then(res => {
                console.log(res.data)
                toast.success(listid.length + " phiên học đã bị xoá do vi phạm ")
            }).catch(err => {

            })
        console.log(list, listid)
        StudentService.getlist().then(res => {
            let lists = list
            list.map(item => {
                let index = res.data.findIndex(i => i.code == item.code)
                if (index == -1)
                    lists = lists.filter(i => i.code != item.code)
            })
            let listsave = []
            let date = ''
            lists.map((i, e) => {

                let save = [i.sessioncode, i.code, i.name, i.course, i.car, i.date, i.datestart, i.distance, i.hours, i.timenight]
                listsave.push(save)
            })
            date = list[0].date
            let listitemstudent = [[]]
            listitemstudent[0] = listsave
            console.log(listitemstudent)
            SessionService.getbyStartAndEnd(ExcelDateToJSDate(e[0].thoigianbd.substring(0, 10)), ExcelDateToJSDate(e[e.length - 1].thoigianbd.substring(0, 10))).then(
                res => {
                    console.log(res.data, date, listsave)
                    if (res.data.length == 0 && listitemstudent[0].length > 0) {

                        SaveSessionNew(listsave)
                    }
                    else {
                        res.data.map((item, index) => {
                            listsave = listsave.filter(i => i[0] != item.sessioncode)
                        })
                        console.log(listsave)
                        if (listsave.length > 0) {
                            console.log(listsave)
                            let listsaveofsession = [[]]
                            listsaveofsession[0] = listsave
                            // SessionService.addmany(listsaveofsession).then(res => {
                            //     toast.success("Lưu dữ liệu phiên học thành công")
                            //     console.log(res.data)
                            // }).catch(err => {
                            //     toast.error("Dữ liệu lưu không thành công")
                            // })
                            SaveSessionNew(listsave)
                        }
                        else {
                            toast.info("Dữ liệu không có học viên")
                        }
                    }
                }
            ).catch(er => {
                console.log(er)
            })

        })


    }
    const getdata = (e) => {
        console.log(e)
        // console.log(new Date(ExcelDateToJSDate(e[1].magiaovien.substring(0, 10)) + ' ' + e[1].magiaovien.substring(11, 16)))
        const ngay = e[e.length - 1].thoigianbd + ''

        // if (e[0].TT == 'Khả dụng') {
        getlistdata(e)
        if (ExcelDateToJSDate(e[0].thoigianbd.substring(0, 10)) == ExcelDateToJSDate(e[e.length - 1].thoigianbd.substring(0, 10))) {
            const ngayhoc = ExcelDateToJSDate(ngay.substring(0, 10))
            toast.success("Đọc file thành công")
            CoHuuService.getlistday(ngayhoc)
                .then(ress => {

                    if (ress.data.length > 0) {

                        let ok = window.confirm("Ngày học đã tồn tại ! Bạn có muốn ghi đè dữ liệu")
                        if (ok) {
                            setloadings(false)
                            let listflagcohuu = []

                            listgv.map((items, index) => {
                                console.log(e.filter(item => item.soxe == items.soxe))

                                const tongkm = e.filter(item => item.soxe == items.soxe).reduce((a, v) => (a = a + Number(v.quangduong)), 0)
                                const sokmdem = e.filter(item => item.soxe == items.soxe && new Date("1990-09-09 " + item.thoigiankt.substring(11, 19)).getHours() >= 18).reduce((a, v) => (a = a + Number(v.quangduong)), 0)
                                let cohuu = { giaovien: items.name, ngay: '', lotrinh: "", soxe: items.soxe, sokmdem: sokmdem, sokmngay: tongkm - sokmdem }
                                let indexs = listflagcohuu.findIndex(item => item.giaovien == items.name)
                                // console.log(cohuu)
                                if (listflagcohuu.length == 0 || indexs == -1) {
                                    listflagcohuu.push(cohuu)
                                }
                                else {
                                    listflagcohuu[indexs].sokmdem = parseFloat(listflagcohuu[indexs].sokmdem) + sokmdem
                                    listflagcohuu[indexs].sokmngay = parseFloat(listflagcohuu[indexs].sokmngay) + (tongkm - sokmdem)
                                }

                            })
                            console.log(ress.data, listflagcohuu)
                            let listlast = []
                            ress.data.map((item, index) => {
                                let i = listflagcohuu.findIndex(e => e.giaovien == item.giaovien)
                                console.log(item.giaovien, listflagcohuu[i])
                                item.sokmdem = listflagcohuu[i].sokmdem
                                item.sokmngay = listflagcohuu[i].sokmngay
                                listlast.push(item)

                            })



                            CoHuuService.edit(listlast)
                                .then(res => {
                                    console.log(res.data)
                                    CoHuuService.getlist().then(res => {
                                        const date = new Date()
                                        const ngayhoc = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() - 2)
                                        let listcohuus = res.data.filter(item => new Date(item.ngay) >= new Date(ngayhoc))
                                        setlistch(res.data)
                                        setDatas(listcohuus.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                                        toast.success("Ghi đè dữ liệu ngày " + new Date(listlast[0].ngay).toLocaleDateString('en-GB') + " thành công")
                                        setloadings(true)
                                        setlistcohuu([...listcohuus.sort((a, b) => new Date(b.ngay) - new Date(a.ngay))])
                                        // console.log(listcohuus)
                                        setloadings(true)
                                    }).catch(err => {
                                        console.log(err)
                                    })
                                })
                                .catch(err => {
                                    console.log(err)
                                })


                        }
                    }
                    else {
                        console.log(ress.data)
                        savedata(e)
                    }
                })
        }

        // }
        // else {
        //     let listid = []
        //     e.map((item, index) => {
        //         listid.push("'" + item.maphienhoc + "'")
        //     })
        //     SessionService.deletemanyid(listid).then(res => {
        //         console.log(res.data)
        //     }).catch(err => {

        //     })

        // }





    }
    const savedata = async (e) => {
        console.log(e)
        const ngay = e[e.length - 1].thoigianbd + ''
        const ngayhocs = ExcelDateToJSDate(ngay.substring(0, 10))
        console.log(ngay, ngayhocs)

        setloadings(false)
        let listflagcohuu = []
        listgv.map((items, index) => {

            const tongkm = e.filter(item => item.soxe == items.soxe).reduce((a, v) => (a = a + Number(v.quangduong)), 0)
            const sokmdem = e.filter(item => item.soxe == items.soxe && new Date("1990-09-09 " + item.thoigiankt.substring(11, 19)).getHours() >= 18).reduce((a, v) => (a = a + Number(v.quangduong)), 0)
            let cohuu = [items.soxe, items.name, "", ngayhocs, tongkm - sokmdem, sokmdem]
            let indexs = listflagcohuu.findIndex(item => item[1] == items.name)



            if (!listflagcohuu.length || indexs == -1) {
                // console.log(listflagcohuu.findIndex(item => item.giaovien == items.name))
                listflagcohuu.push(cohuu)
            }
            else {
                listflagcohuu[indexs][4] = parseFloat(listflagcohuu[indexs][4]) + sokmdem
                listflagcohuu[indexs][5] = parseFloat(listflagcohuu[indexs][5]) + (tongkm - sokmdem)
            }


        })
        console.log(listflagcohuu)
        let list = [[]]
        list[0] = listflagcohuu
        console.log(list)
        let listsave = listch

        CoHuuService.add(list)
            .then(res => {


                console.log(res.data)


                CoHuuService.getlist().then(res => {
                    const date = new Date()
                    const ngayhoc = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() - 1)
                    let listcohuus = res.data.filter(item => new Date(item.ngay) >= new Date(ngayhoc))
                    setlistch(res.data)


                    setDatas(listcohuus.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                    toast.success("Thêm dữ liệu ngày " + new Date(listflagcohuu[0][3]).toLocaleDateString('en-GB') + " thành công")
                    setloadings(true)
                    setlistcohuu(listcohuus.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                    setlistflag(listcohuus)
                }).catch(err => {
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err)
            })




    }
    useEffect(() => {
        // TestApiService.login({
        //     "username": "dtlxHungThinh",
        //     "password": "@dtlxHungThinh"
        // }).then(res => {


        // })
        // const inputString = "trần văn";
        // const name = encodeURIComponent(inputString);
        // LocalService.getHanhTrinh("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImR0bHhIdW5nVGhpbmgiLCJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJEaXNwbGF5TmFtZSI6IlVzZXIiLCJyb2xlIjoiYWRtaW4iLCJNYUR2IjoiOTQwMDkiLCJuYmYiOjE2OTkyMzU4NDAsImV4cCI6MTY5OTMyMjI0MCwiaWF0IjoxNjk5MjM1ODQwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojc3ODIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQwMCJ9.7CQBAyIhfByGhqWQmxcCnTTieAHkAjelvunfuXAT1dY", name).then(ress => {
        //     console.log(ress.data)
        // })
        // // TestApiService.hanhtrinh().then(res => {
        // //     console.log(res.data, name)
        // // })
        let heads = ["index", "stt", "stt2", "maphienhoc", "thoigianbd", "thoigiankt", "thoigian", "quangduong", "magiaovien", "tengiaovien", "mahocvien", 'tenhocvien', "ngaysinh", "cmnd", "makhoahoc", "tenkhoahoc", "ten1", "ten2", "loaikhoahoc", "soxe", "soGTVT", "CSDT", "DVTDL", "TGT", "TGNHAN", "canhbao", "TT"]


        sethead(heads)
        console.log(users)
        if ((!users || users.roleId != 1) && flag == 0) {
            flag = 1
            navitive("/")
            toast.error("Truy cập không được phép")
        }
        else {
            const date = new Date()
            let list = []
            const ngayhoc = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() - 1)
            CoHuuService.getlist()
                .then(
                    res => {
                        console.log(res.data, ngayhoc)
                        list = res.data.filter(item => new Date(item.ngay) >= new Date(ngayhoc))
                        console.log(list)
                        GiaoVienService.getlist()
                            .then(ress => {
                                setlistch(res.data.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                                setlistgv(ress.data)
                                setloadings(true)
                                setDatas(list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                                setlistcohuu([...list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay))])

                            }).catch(err => {
                                console.log(err)
                            })


                    }

                ).catch(err => {
                    console.log(err)
                })


        }


    }, [listflag])
    const changetext = (e) => {
        const objs = objfilter
        objs.condition = ''
        setobjfilter(objs)
        settext(e.target.value)
        let list = []
        if (date) {
            list = listch.filter(item => item.ngay == date)
        }
        else
            list = listch
        if (e.target.value)
            list = list.filter(item => (xoa_dau(item.giaovien.toLowerCase())).includes(xoa_dau(e.target.value.toLowerCase())) == true)
        setlistcohuu(list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
        setDatas(list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))



    }

    const getlist = (e) => {
        setLists(e)


    }

    const filter = (obj) => {
        // console.log(obj.list)

        setlistcohuu([...obj.list])
        setDatas([...obj.list])
        setobjfilter(obj)
    }
    const edit = () => {

        CoHuuService.getlist().then(res => {
            let list = []
            if (objfilter.date) {
                list = res.data.filter(i => i.ngay = objfilter.date)
            }
            else
                list = res.data
            setlistcohuu(list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
            setDatas(list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
            setlistch(res.data.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
        })
    }
    return (
        <>
            <Header />
            <main id="cabin_list" className="main">
                <div className="container">
                    {

                        Loadings ?

                            <>

                                <div className='row mt-5  '>
                                    <div className="col col-md-4">
                                        <input type="text" className="form-control  ms-2 " id="teacher" onChange={(e) => changetext(e)} value={text} placeholder="Nhập nội dung tìm kiếm" />
                                    </div>
                                    <CoHuu_Filter filter={filter} listch={listch} listgv={listgv} />
                                    <div className="col col-md-4">
                                        <ImPort getdata={getdata} header={header} head={head} data={Data} row={3} name={"DanhSach_ThongKe_DAT_" + new Date().getFullYear() + "_" + new Date().getMonth() + "_" + new Date().getDate()} />
                                    </div>

                                </div>
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>STT</th>
                                            {(!objfilter.condition || objfilter.condition == 1)
                                                && (
                                                    <th scope="col">Ngày dạy</th>
                                                )}
                                            <th scope="col">Tên giáo viên</th>
                                            {(!objfilter.condition || objfilter.condition == 1)
                                                && (
                                                    <th scope="col">Lộ trình</th>
                                                )}


                                            <th scope="col">Số km ngày</th>
                                            <th scope="col">Số km đêm</th>
                                            <th scope="col">Tổng số km</th>
                                            {(!objfilter.condition || objfilter.condition == 1)
                                                && (
                                                    <th>Quản lý</th>
                                                )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(listcohuu.length < 16 ? listcohuu :
                                            lists) && (listcohuu.length < 16 ? listcohuu :
                                                lists).map((item, index) => {
                                                    return (
                                                        <tr className="alert" role="alert" key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            {(!objfilter.condition || objfilter.condition == 1)
                                                                && (
                                                                    <td>
                                                                        {new Date(item.ngay).toLocaleDateString('en-GB')}
                                                                    </td>
                                                                )}
                                                            <td>
                                                                {item.giaovien
                                                                }
                                                            </td>
                                                            {(!objfilter.condition || objfilter.condition == 1)
                                                                && (
                                                                    <td>
                                                                        {item.lotrinh}
                                                                    </td>
                                                                )}

                                                            <td>
                                                                {item.sokmngay > 0 ? item.sokmngay.toFixed(2) : 0}
                                                            </td>


                                                            <td>
                                                                {item.sokmdem > 0 ? item.sokmdem.toFixed(2) : 0}
                                                            </td>
                                                            <td>
                                                                {(item.sokmngay + item.sokmdem) > 0 ? (item.sokmngay + item.sokmdem).toFixed(2) : 0}
                                                            </td>
                                                            {(!objfilter.condition || objfilter.condition == 1)
                                                                && (
                                                                    <td className="manage">
                                                                        {/* <a href="#" className="close" data-dismiss="alert" aria-label="Close" onClick={() => xoa(item.cabinId)}>
                                                            <span aria-hidden="true"><i className="fa fa-close"></i></span>
                                                        </a> */}
                                                                        <CoHuu_Edit id={item.cohuuId} edit={edit} listch={listch} />
                                                                    </td>
                                                                )}
                                                        </tr>

                                                    )
                                                })
                                        }








                                    </tbody>
                                </table>
                                <Paginations itemsPerPage={20} list={listcohuu} getlist={getlist} />
                            </> : <Loading />
                    }

                </div>
            </main>
        </>
    )
}
export default Cohuu_List;