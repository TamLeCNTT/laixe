import Header from "../../Layout/Header";
import { useState, useEffect } from "react";
import CoHuuService from "../../Service/CoHuuService";
import StudentService from "../../Service/StudentService";
import Paginations from "../../support/Paginations";
// import Cabin_edit from "./Cabin_edit";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import ImPort from "../../support/ImPort";
import GiaoVienService from "../../Service/GiaoVienService";
import './scss/session.scss'
import Loading from "../../Layout/Loading";
import SessionService from "../../Service/SessionService";
import LocalService from "../../Service/LocalService";
const Session_List = () => {
    const [listsession, setlistsession] = useState([])
    const [listsessioninlocal, setlistsessioninlocal] = useState([])
    const [setlistsessioninlocalHavePA, setsetlistsessioninlocalHavePA] = useState([])
    const [AllSessionInLocal, setAllSessioninLocal] = useState([])
    const [lists, setLists] = useState([])
    const [listsearch, setListsearch] = useState([])
    const [listst, setlistst] = useState([])
    // const [listst, setlistst] = useState([])
    const [text, settext] = useState('')
    const [student, setstudent] = useState({})

    const [Loadings, setloadings] = useState(false)
    const [Data, setData] = useState([])
    const [dk, setdk] = useState()
    const [listgv, setlistgv] = useState([])
    const [objfilter, setobjfilter] = useState({})
    let head = ["stt", "mahocvien", "tenhocvien"]
    let header = [["Mã học viên", "Tên học viên", "Khoá", "Hạng", "Quãng đương", "Số giờ học", "Số giờ đêm", "Quãng đường thiếu", "Thời gian thiếu", "Giờ đêm thiếu", "Kết quả"]]
    const users = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const listdk = [{ id: 40, rank: "HẠNG FC", hours: 9.5, timenight: 2.05, distance: 340 }, { id: 4, rank: "B11", hours: 12.15, timenight: 4.05, distance: 710 }, { id: 1, rank: "B2", hours: 20.05, timenight: 4.05, distance: 810 }, { id: 2, rank: "C", hours: 24.05, timenight: 2.55, distance: 825 }]
    let navitive = useNavigate()
    let flag = 0

    const setDatas = (list) => {
        let listdata = []
        list.map((item, index) => {
            let e = { ngay: item.ngay, giaovien: item.giaovien, lotrinh: item.lotrinh, sokmngay: item.sokmngay, sokmdem: item.sokmdem, tongkm: Number(item.sokmdem) + Number(item.sokmngay) }
            console.log(e)
            listdata.push(e)
        })
        setData(listdata)
    }
    const changeTime = (e, i) => {
        if (i == 1)
            return parseInt(e) + "h" + (parseInt((e - parseInt(e)) * 60) > 9 ? (parseInt((e - parseInt(e)) * 60)) : "0" + (parseInt((e - parseInt(e)) * 60)))
        else
            return parseInt(e) + "h" + (parseInt((e - parseInt(e)) * 60) > 9 ? (parseInt((e - parseInt(e)) * 60) + 1) : "0" + (parseInt((e - parseInt(e)) * 60) + 1))

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
    const ExcelDateToJSDate = (dates) => {

        let date = dates.split("-")

        let day = date[0];
        let month = date[1];

        let year = date[2];
        return (year + '-' + month + '-' + day)
    }
    const getdata = (e) => {
        console.log(e)

        let listsessionexport = []
        e.map((item, index) => {
            let khoa = ''
            let inndex = listst.findIndex(i => i.code == item.mahocvien.trim())
            console.log(inndex, item.mahocvien)
            if (listst[inndex]) {

                let dieukien = listdk.filter(item => item.rank == listst[inndex].rank)[0]

                SessionService.getByid(item.mahocvien.trim())
                    .then(res => {
                        console.log(res.data)
                        let listsave = []

                        res.data.map((item, index) => {
                            khoa = item.course
                            if (listsave.length == 0 || listsave.findIndex(i => i.sessioncode == item.sessioncode) == -1)
                                listsave.push(item)
                        })
                        let quangduong = (listsave.reduce((a, v) => (a = a + Number(v.distance)), 0)).toFixed(2)
                        let thoigian = (listsave.reduce((a, v) => (a = a + Number(v.hours)), 0)).toFixed(2)
                        let giodem = (listsave.reduce((a, v) => (a = a + Number(v.nightTime)), 0)).toFixed(2)
                        let ketqua = ''
                        if (giodem - dieukien.timenight >= 0 && thoigian - dieukien.hours >= 0 && quangduong - dieukien.distance >= 0)
                            ketqua = "Đạt"
                        else
                            ketqua = "Không đạt"
                        let session = {
                            mahocvien: item.mahocvien, tenhocvien: item.tenhocvien, khoa: listst[inndex].course, hang: dieukien.rank, quangduong: quangduong, giohoc: changeTime(thoigian, 1),
                            giodem: changeTime(giodem, 1), quangduongthieu: dieukien.distance <= quangduong ? "Đủ" : (dieukien.distance - quangduong + 5).toFixed(2) + '',
                            giothieu: dieukien.hours <= thoigian ? "Đủ" : changeTime((dieukien.hours - thoigian) + 0.05, 1),
                            giodemthieu: dieukien.timenight <= giodem ? "Đủ" : changeTime((dieukien.timenight - giodem) + 0.05, 1), ketqua: ketqua
                        }
                        listsessionexport.push(session)
                    })
                    .catch(err => {
                        let session = { mahocvien: item.mahocvien, tenhocvien: item.tenhocvien, khoa: listst[inndex].course, hang: dieukien.rank, quangduong: 0, giohoc: "00:00", giodem: "00:00", quangduongthieu: dieukien.distance, giothieu: dieukien.hours, giodemthieu: dieukien.timenight, ketqua: "Không Đạt" }
                        listsessionexport.push(session)
                        console.log("sss")
                    })
            }
            setData(listsessionexport)

        })
        console.log(listsessionexport)
        toast.success("Đọc file thành công")
        // let index = listsession.findIndex(item => item.course == e[0].khoa)
        // if (index > -1) {
        //     toast.info("Khoá học đã tồn tại")
        // }
        // else {

        //     console.log(e)
        //     let list = []
        //     e.map((item, i) => {
        //         let strings = item.khoa + ''
        //         console.log()
        //         const student = [item.mahocvien, item.tenhocvien, item.khoa, strings.substring(14, strings.length), 0, '', '', 0]
        //         list.push(student)
        //     })
        //     let listsave = [[]]
        //     listsave[0] = list
        //     StudentService.addmany(listsave).then(res => {
        //         console.log(res.data)
        //     })
        // }



    }
    const convertStoHHMMSS = (secs) => {
        var sec_num = parseInt(secs, 10)
        var hours = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)

            .join(":")
    }

    useEffect(() => {

        StudentService.getlist().then(ress => {

            setlistst(ress.data)
            console.log(ress.data)
            setloadings(true)

        }).catch(err => {
            console.log(err)
        })



    }, [])
    const changetext = (e) => {

        settext(e.target.value)

        let list = listst.filter(item => (xoa_dau(item.name.toLowerCase())).includes(xoa_dau(e.target.value.toLowerCase())) == true || (xoa_dau(item.code.toLowerCase())).includes(xoa_dau(e.target.value.toLowerCase())) == true)

        console.log(list)

        if (e.target.value)
            setListsearch(list)
        else
            setListsearch([])





    }

    const getlist = (e) => {
        setLists(e)


    }
    const getlistofallsession = (e) => {
        setlistsessioninlocalHavePA(e)
    }


    const showdata = (e) => {
        setloadings(false)
        settext('')
        setListsearch([])

        let inndex = listst.findIndex(i => i.code == e)
        let dieukien = listdk.filter(item => item.rank.trim() == listst[inndex].rank.trim())[0]

        setdk(dieukien)
        setstudent(listst[inndex])
        SessionService.getByid(e)
            .then(res => {
                console.log(res.data)
                let listsave = []
                res.data.map((item, index) => {
                    if (listsave.length == 0 || listsave.findIndex(i => i.sessioncode == item.sessioncode) == -1)
                        listsave.push(item)
                })
                setlistsession([...listsave])
                // LocalService.getHanhTrinh("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImR0bHhIdW5nVGhpbmgiLCJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJEaXNwbGF5TmFtZSI6IlVzZXIiLCJyb2xlIjoiYWRtaW4iLCJNYUR2IjoiOTQwMDkiLCJuYmYiOjE2OTkyMzU4NDAsImV4cCI6MTY5OTMyMjI0MCwiaWF0IjoxNjk5MjM1ODQwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojc3ODIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQwMCJ9.7CQBAyIhfByGhqWQmxcCnTTieAHkAjelvunfuXAT1dY", e)
                //     .then(ress => {
                //         let listSesionInLocal = []
                //         console.log(ress.data.Data)
                //         ress.data.Data.map((item, index) => {
                //             if (listsave.findIndex(e => e.sessioncode == item.SessionId) == -1)
                //                 listSesionInLocal.push(item)
                //         })
                //         setloadings(true)
                //         console.log(listSesionInLocal)
                //         setlistsessioninlocal([...listSesionInLocal])
                //         setlistsession([...listsave])
                //         setAllSessioninLocal(ress.data.Data)
                //     })

            })
            .catch(err => {
                console.log(err)
                setlistsession([])
            })
    }
    return (
        <>
            <Header />
            <main id="session_list" className="main">
                <div className="container">
                    <div className='row mt-5 d-flex justify-content-between '>
                        <div className="col col-md-7 search ">
                            <input type="text" className="form-control  ms-2 " id="teacher" onChange={(e) => changetext(e)} value={text} placeholder="Nhập nội dung tìm kiếm" />
                            <ul className={text ? " sub-list show" : "sub-list"}>
                                {
                                    listsearch.map((item, index) => {
                                        return (

                                            <li className="sub-item"><a onClick={() => showdata(item.code)} className="sub-content">
                                                Mã [{item.code}] - Tên [{item.name}] - Khoá [{item.course}]</a></li>

                                        )

                                    })
                                }

                            </ul>
                        </div>
                        <div className="col col-md-4">
                            <ImPort getdata={getdata} header={header} head={head} data={Data} row={1} name={"DanhSach_ThongKe_DAT_" + new Date().getFullYear() + "_" + new Date().getMonth() + "_" + new Date().getDate() + "_" + new Date().getHours() + "_" + new Date().getMinutes() + "_" + new Date().getSeconds()} />
                        </div>
                        {/* <CoHuu_Filter filter={filter} listst={listst} listgv={listgv} /> */}



                    </div>


                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>STT</th>
                                <th>Ngày học</th>
                                <th scope="col">Mã học viên</th>
                                <th scope="col">Tên học viên</th>

                                <th scope="col">Khoá học</th>




                                <th scope="col">Quãng đường </th>
                                <th scope="col">Thời gian </th>
                                <th scope="col">Thời gian đêm</th>
                                <th scope="col">Số xe</th>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                lists && lists.map((item, index) => {
                                    return (
                                        <tr className="alert " role="alert" key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                {item.datestart}
                                            </td>
                                            <td>
                                                {item.code}
                                            </td>
                                            <td>
                                                {item.name}
                                            </td>

                                            <td>
                                                {student.course
                                                }
                                            </td>




                                            <td >
                                                {item.distance ? item.distance.toFixed(2) + " Km" : ""}
                                            </td>


                                            <td>
                                                {(Number(item.hours)).toFixed(2)}
                                            </td>
                                            <td>
                                                {(Number(item.nightTime)).toFixed(2)}
                                            </td>
                                            <td>
                                                {item.car}
                                            </td>


                                        </tr>

                                    )
                                })
                            }
                            {(listsession.reduce((a, v) => (a = a + Number(v.distance)), 0)).toFixed(2) > 0 && (
                                <>
                                    <tr className="alert sum ">
                                        <td colSpan={5}>
                                            Tổng
                                        </td>
                                        <td>
                                            {(listsession.reduce((a, v) => (a = a + Number(v.distance)), 0)).toFixed(2)} Km
                                        </td>
                                        <td>
                                            {changeTime((listsession.reduce((a, v) => (a = a + Number(v.hours)), 0)).toFixed(2), 1)}
                                        </td>
                                        <td>
                                            {changeTime((listsession.reduce((a, v) => (a = a + Number(v.nightTime)), 0)).toFixed(2), 1)}
                                        </td>
                                    </tr>


                                </>
                            )}
                            {dk && (
                                <tr className="alert thieu ">
                                    <td colSpan={2}>
                                        Còn thiếu
                                    </td>
                                    <td >
                                        {lists[0] ? lists[0].code : ""}
                                    </td>
                                    <td colSpan={2}>
                                        {lists[0] ? lists[0].name : ""}
                                    </td>

                                    <td>
                                        {(dk.distance - (listsession.reduce((a, v) => (a = a + Number(v.distance)), 0)).toFixed(2)) > 0 ? "Thiếu " + ((dk.distance - (listsession.reduce((a, v) => (a = a + Number(v.distance)), 0))).toFixed(2)) + " Km" : "Đủ Km"}
                                    </td>
                                    <td>
                                        {(dk.hours - (listsession.reduce((a, v) => (a = a + Number(v.hours)), 0)).toFixed(2)) > 0 ? "Thiếu " + changeTime((dk.hours - (listsession.reduce((a, v) => (a = a + Number(v.hours)), 0))).toFixed(2), 2) : "Đủ giờ"}
                                    </td>
                                    <td>
                                        {(dk.timenight - (listsession.reduce((a, v) => (a = a + Number(v.nightTime)), 0)).toFixed(2)) > 0 ? "Thiếu " + changeTime((dk.timenight - (listsession.reduce((a, v) => (a = a + Number(v.nightTime)), 0))).toFixed(2), 2) + " đêm" : "Đủ đêm"}
                                    </td>
                                </tr>
                            )}






                        </tbody>
                    </table>
                    <Paginations itemsPerPage={4} list={listsession} getlist={getlist} />

                    {/* {
                        Loadings ?
                            <>
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>STT</th>
                                            <th>Ngày học</th>
                                            <th scope="col">Mã học viên</th>
                                            <th scope="col">Tên học viên</th>

                                            <th scope="col">Khoá học</th>




                                            <th scope="col">Quãng đường </th>
                                            <th scope="col">Thời gian </th>
                                            <th scope="col">Thời gian đêm</th>
                                            <th scope="col">Số xe</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listsessioninlocal.map((item, index) => {
                                                return (


                                                    <tr className="alert " role="alert" key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>
                                                            {item.DangNhap}
                                                        </td>
                                                        <td>
                                                            {item.MaDK}
                                                        </td>
                                                        <td>
                                                            {item.HoTen
                                                            }
                                                        </td>

                                                        <td>
                                                            {item.KhoaHoc
                                                            }
                                                        </td>




                                                        <td >
                                                            {item.TongQuangDuong ? item.TongQuangDuong.toFixed(2) + " Km" : ""}
                                                        </td>


                                                        <td>
                                                            {convertStoHHMMSS(item.TongThoiGian)}
                                                        </td>
                                                        <td>
                                                            {convertStoHHMMSS(item.TongThoiGian)}
                                                        </td>
                                                        <td>
                                                            {item.BienSo}
                                                        </td>


                                                    </tr>

                                                )
                                            })}
                                        {(listsession.reduce((a, v) => (a = a + Number(v.distance)), 0)).toFixed(2) > 0 && (
                                            <>
                                                <tr className="alert sum ">
                                                    <td colSpan={5}>
                                                        Tổng
                                                    </td>
                                                    <td>
                                                        {(listsession.reduce((a, v) => (a = a + Number(v.distance)), 0)).toFixed(2)} Km
                                                    </td>
                                                    <td>
                                                        {changeTime((listsession.reduce((a, v) => (a = a + Number(v.hours)), 0)).toFixed(2), 1)}
                                                    </td>
                                                    <td>
                                                        {changeTime((listsession.reduce((a, v) => (a = a + Number(v.nightTime)), 0)).toFixed(2), 1)}
                                                    </td>
                                                </tr>


                                            </>
                                        )}
                                        {dk && (
                                            <tr className="alert thieu ">
                                                <td colSpan={2}>
                                                    Còn thiếu
                                                </td>
                                                <td >
                                                    {lists[0] ? lists[0].code : ""}
                                                </td>
                                                <td colSpan={2}>
                                                    {lists[0] ? lists[0].name : ""}
                                                </td>

                                                <td>
                                                    {(dk.distance - (listsession.reduce((a, v) => (a = a + Number(v.distance)), 0)).toFixed(2)) > 0 ? "Thiếu " + ((dk.distance - (listsession.reduce((a, v) => (a = a + Number(v.distance)), 0))).toFixed(2)) + " Km" : "Đủ Km"}
                                                </td>
                                                <td>
                                                    {(dk.hours - (listsession.reduce((a, v) => (a = a + Number(v.hours)), 0)).toFixed(2)) > 0 ? "Thiếu " + changeTime((dk.hours - (listsession.reduce((a, v) => (a = a + Number(v.hours)), 0))).toFixed(2), 2) : "Đủ giờ"}
                                                </td>
                                                <td>
                                                    {(dk.timenight - (listsession.reduce((a, v) => (a = a + Number(v.nightTime)), 0)).toFixed(2)) > 0 ? "Thiếu " + changeTime((dk.timenight - (listsession.reduce((a, v) => (a = a + Number(v.nightTime)), 0))).toFixed(2), 2) + " đêm" : "Đủ đêm"}
                                                </td>
                                            </tr>
                                        )}






                                    </tbody>
                                </table>
                                <Paginations itemsPerPage={4} list={AllSessionInLocal} getlist={getlistofallsession} />
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>STT</th>
                                            <th>Ngày học</th>
                                            <th scope="col">Mã học viên</th>
                                            <th scope="col">Tên học viên</th>

                                            <th scope="col">Khoá học</th>




                                            <th scope="col">Quãng đường </th>
                                            <th scope="col">Thời gian </th>
                                            <th scope="col">Thời gian đêm</th>
                                            <th scope="col">Số xe</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            setlistsessioninlocalHavePA.map((item, index) => {
                                                return (


                                                    <tr className="alert " role="alert" key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>
                                                            {item.DangNhap}
                                                        </td>
                                                        <td>
                                                            {item.MaDK}
                                                        </td>
                                                        <td>
                                                            {item.HoTen
                                                            }
                                                        </td>

                                                        <td>
                                                            {item.KhoaHoc
                                                            }
                                                        </td>




                                                        <td >
                                                            {item.TongQuangDuong ? item.TongQuangDuong.toFixed(2) + " Km" : ""}
                                                        </td>


                                                        <td>
                                                            {convertStoHHMMSS(item.TongThoiGian)}
                                                        </td>
                                                        <td>
                                                            {convertStoHHMMSS(item.TongThoiGian)}
                                                        </td>
                                                        <td>
                                                            {item.BienSo}
                                                        </td>


                                                    </tr>

                                                )
                                            })}
                                        {(listsession.reduce((a, v) => (a = a + Number(v.distance)), 0)).toFixed(2) > 0 && (
                                            <>
                                                <tr className="alert sum ">
                                                    <td colSpan={5}>
                                                        Tổng
                                                    </td>
                                                    <td>
                                                        {(listsession.reduce((a, v) => (a = a + Number(v.distance)), 0)).toFixed(2)} Km
                                                    </td>
                                                    <td>
                                                        {changeTime((listsession.reduce((a, v) => (a = a + Number(v.hours)), 0)).toFixed(2), 1)}
                                                    </td>
                                                    <td>
                                                        {changeTime((listsession.reduce((a, v) => (a = a + Number(v.nightTime)), 0)).toFixed(2), 1)}
                                                    </td>
                                                </tr>


                                            </>
                                        )}
                                        {dk && (
                                            <tr className="alert thieu ">
                                                <td colSpan={2}>
                                                    Còn thiếu
                                                </td>
                                                <td >
                                                    {lists[0] ? lists[0].code : ""}
                                                </td>
                                                <td colSpan={2}>
                                                    {lists[0] ? lists[0].name : ""}
                                                </td>

                                                <td>
                                                    {(dk.distance - (listsession.reduce((a, v) => (a = a + Number(v.distance)), 0)).toFixed(2)) > 0 ? "Thiếu " + ((dk.distance - (listsession.reduce((a, v) => (a = a + Number(v.distance)), 0))).toFixed(2)) + " Km" : "Đủ Km"}
                                                </td>
                                                <td>
                                                    {(dk.hours - (listsession.reduce((a, v) => (a = a + Number(v.hours)), 0)).toFixed(2)) > 0 ? "Thiếu " + changeTime((dk.hours - (listsession.reduce((a, v) => (a = a + Number(v.hours)), 0))).toFixed(2), 2) : "Đủ giờ"}
                                                </td>
                                                <td>
                                                    {(dk.timenight - (listsession.reduce((a, v) => (a = a + Number(v.nightTime)), 0)).toFixed(2)) > 0 ? "Thiếu " + changeTime((dk.timenight - (listsession.reduce((a, v) => (a = a + Number(v.nightTime)), 0))).toFixed(2), 2) + " đêm" : "Đủ đêm"}
                                                </td>
                                            </tr>
                                        )}






                                    </tbody>
                                </table>

                            </> : <Loading />} */}
                </div>
            </main >
        </>
    )
}
export default Session_List;