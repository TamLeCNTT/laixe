import Header from "../../Layout/Header";
import { useState, useEffect } from "react";
import CabinService from "../../Service/CabinService";
import "./cabin_list.scss"
import Paginations from "../../support/Paginations";
import Cabin_edit from "./Cabin_edit";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import ImPort from "../../support/ImPort";
import Loading from "../../Layout/Loading";
const Cabin_list = () => {
    const [listcabin, setlistcabin] = useState([])
    const [lists, setLists] = useState([])
    const [listcb, setlistcb] = useState([])
    const [listcbedit, setlistcbedit] = useState([])
    const [text, settext] = useState('')
    const [date, setdate] = useState()
    const [head, sethead] = useState([])
    const [Data, setData] = useState([])
    const users = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const [Load, setLoad] = useState(true)
    let navitive = useNavigate()
    let flag = 0
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
    const ExcelDateToJSDate = (date) => {
        let converted_date = new Date(Math.round((date - 25569) * 864e5));
        converted_date = String(converted_date).slice(4, 15)
        date = converted_date.split(" ")
        let day = date[1];
        let month = date[0];
        month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(month) / 3 + 1
        if (month.toString().length <= 1)
            month = '0' + month
        let year = date[2];
        return String(day + '-' + month + '-' + year.slice(2, 4))
    }
    const getdata = (e) => {


        toast.success("Đọc file thành công")
        console.log(e)


        // console.log(e.filter(item => new Date(item.thoigianbd).getHours() > 18))
        console.log(e.filter(item => item.soxe == "83C11093"))
        console.log(e.filter(item => item.soxe == "83C11093").reduce((a, v) => (a = a + Number(v.quangduong)), 0))
        e.filter(item => item.soxe == "83C11093").map((items, index) => {
            console.log(new Date(items.thoigianbd).getHours())
        })
        console.log(e.filter(item => item.soxe == "83C11093" && new Date(item.thoigianbd).getHours() >= 18).reduce((a, v) => (a = a + Number(v.quangduong)), 0))

    }
    useEffect(() => {
        let heads = ["index", "stt", "stt2", "maphienhoc", "thoigianbd", "thoigiankt", "thoigian", "quangduong", "magiaovien", "tengiaovien", "mahocvien", 'tenhocvien', "ngaysinh", "cmnd", "makhoahoc", "tenkhoahoc", "ten1", "ten2", "loaikhoahoc", "soxe"]
        sethead(heads)
        if ((!users || users.roleId != 1) && flag == 0) {
            flag = 1
            navitive("/")
            toast.error("Truy cập không được phép")
        }
        else {
            setLoad(false)
            CabinService.getlist().then(
                res => {

                    console.log(res.data)
                    setlistcbedit(res.data)
                    setLoad(true)
                    // let listfag = [...res.data]
                    // listfag.map((item, index) => {
                    //     if (item.buoi == 1)
                    //         listfag[index].buoi = "Sáng 7h-10h"
                    //     else
                    //         if (item.buoi == 2)
                    //             listfag[index].buoi = "Trưa 10h30-13h30"
                    //         else
                    //             listfag[index].buoi = "Chiều 14h-17h"
                    // })

                    // let list = []
                    // if (!text) {
                    //     list = listfag
                    // }
                    // else list = listfag.filter(item => (xoa_dau(item.giaovien.toLowerCase())).includes(xoa_dau(text.toLowerCase())) == true || (item.songuoi + '').includes(text) == true || (xoa_dau(item.buoi.toLowerCase())).includes(xoa_dau(text.toLowerCase())) == true)
                    setlistcabin(res.data.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                    setlistcb(res.data.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))

                }
            ).catch(err => {
                console.log(err)
            })
        }


    }, [])
    const changetext = (e) => {
        settext(e.target.value)
        let list = []

        // res.data.map((item, index) => {
        //     if (item.buoi == 1)
        //         item.buoi = "Sáng 7h-10h"
        //     else
        //         if (item.buoi == 2)
        //             item.buoi = "Trưa 10h30-13h30"
        //         else
        //             item.buoi = "Chiều 14h-17h"
        // })
        if (date) {
            list = listcb.filter(item => item.ngay == date)
        }
        else
            list = listcb
        if (e.target.value)
            list = list.filter(item => (xoa_dau(item.giaovien.toLowerCase())).includes(xoa_dau(e.target.value.toLowerCase())) == true || (item.songuoi + '').includes(e.target.value) == true)
        setlistcabin(list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))



    }
    const changedate = (e) => {
        setdate(e.target.value)
        let list = []

        if (text)
            list = listcb.filter(item => (xoa_dau(item.giaovien.toLowerCase())).includes(xoa_dau(text.toLowerCase())) == true || (item.songuoi + '').includes(text) == true)

        else list = listcb

        if (e.target.value)
            list = list.filter(item => item.ngay == e.target.value)
        console.log(list)
        setlistcabin(list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))






    }
    const getlist = (e) => {
        setLists(e)


    }
    const xoa = (e) => {
        CabinService.delete(e).then(
            res => {
                let list = listcabin.filter(item => item.cabinId != e)
                setlistcabin(list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                setlistcb(list)
            }
        )
    }
    const save = () => {
        setLoad(false)
        CabinService.getlist().then(
            res => {
                setLoad(true)
                setlistcbedit(res.data)
                setlistcabin(res.data.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                setlistcb(res.data)
            }
        ).catch(err => {

        })
    }
    return (
        <>
            <Header />
            {Load ?
                <main id="cabin_list" className="main">
                    <div className='row mt-5  '>
                        <div className="col col-md-4">
                            <input type="text" className="form-control  ms-2 " id="teacher" onChange={(e) => changetext(e)} value={text} placeholder="Nhập nội dung tìm kiếm" />
                        </div>
                        <div className="col col-md-6">
                            <input type="date" className="form-control w-50 ms-2 " id="teacher" onChange={(e) => changedate(e)} value={date} placeholder="Nhập nội dung tìm kiếm" />
                        </div>
                        <div className="col col-md-2">
                            {/* <ImPort getdata={getdata} head={head} data={Data} /> */}
                        </div>


                    </div>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>STT</th>
                                <th scope="col">Ngày học</th>
                                <th scope="col">Buổi học</th>
                                <th scope="col">Giáo viên</th>
                                <th scope="col">Số học viên</th>
                                <th>Quản lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lists && lists.map((item, index) => {
                                    return (
                                        <tr className="alert" role="alert">
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                {new Date(item.ngay).toLocaleDateString('en-GB')}
                                            </td>
                                            <td>
                                                {item.buoi == 1 ? "Sáng 7h-10h" : item.buoi == 2 ? "Trưa 10h30-13h30" : "Chiều 14h-17h"
                                                }
                                            </td>
                                            <td>
                                                {item.giaovien}
                                            </td>
                                            <td>
                                                {item.songuoi}
                                            </td>
                                            <td className="manage">
                                                <a href="#" className="close" data-dismiss="alert" aria-label="Close" onClick={() => xoa(item.cabinId)}>
                                                    <span aria-hidden="true"><i className="fa fa-close"></i></span>
                                                </a>
                                                <Cabin_edit id={item.cabinId} save={save} listcbedit={listcbedit} />
                                            </td>

                                        </tr>

                                    )
                                })
                            }








                        </tbody>
                    </table>
                    <Paginations itemsPerPage={8} list={listcabin} getlist={getlist} />
                </main> :
                <Loading />
            }


        </>
    )
}
export default Cabin_list;