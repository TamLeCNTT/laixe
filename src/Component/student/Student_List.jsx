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
import Student_Add from "./Student_Add";
import Student_Edit from "./Student_Edit";
import Loading from "../../Layout/Loading";
const Student_List = () => {
    const [listsession, setlistsession] = useState([])
    const [lists, setLists] = useState([])
    const [listst, setlistst] = useState([])
    // const [listst, setlistst] = useState([])
    const [text, settext] = useState('')
    const [date, setdate] = useState()

    const [Loadings, setloadings] = useState(false)
    const [Data, setData] = useState([])
    const [listflag, setlistflag] = useState([])
    const [listgv, setlistgv] = useState([])
    const [objfilter, setobjfilter] = useState({})
    let head = ["mahocvien", "tenhocvien", "ngaysinh", "cmnd", "khoa", "sogio", "sokm"]
    let header = [["mahocvien", "Tên giáo viên", "Lộ trình", "Số Km ngày", "Số Km đêm", "Tổng số Km"]]
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
        // let listdata = []
        // list.map((item, index) => {
        //     let e = { ngay: item.ngay, giaovien: item.giaovien, lotrinh: item.lotrinh, sokmngay: item.sokmngay, sokmdem: item.sokmdem, tongkm: Number(item.sokmdem) + Number(item.sokmngay) }
        //     // console.log(e)
        //     listdata.push(e)
        // })
        // setData(listdata)
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

    const getdata = (e) => {

        if (!e[0].khoa || !e[0].mahocvien || !e[0].tenhocvien)
            toast.error("Định dạng file không chính xác")
        else {
            console.log(listsession)
            StudentService.getlist().then(res => {

                let index = res.data.findIndex(item => item.course == e[0].khoa)
                if (index > -1) {
                    toast.info("Khoá học đã tồn tại")
                }
                else {
                    toast.success("Đọc  file thành công")
                    console.log(e)
                    let list = []
                    e.map((item, i) => {
                        let strings = item.khoa + ''

                        const student = [item.mahocvien, item.tenhocvien, item.khoa, strings.substring(14, strings.length), '']
                        list.push(student)
                    })
                    let listsave = [[]]
                    listsave[0] = list
                    console.log(list)
                    StudentService.addmany(listsave).then(res => {
                        console.log(res.data)
                        toast.success("Luư dữ liệu thành công")
                        StudentService.getlist().then(res => {

                            setlistsession([...res.data])
                        })
                    }).catch(er => {
                        toast.error("Lưu dữ liệU không thành công")
                    })
                }
            }).catch(err => {
                toast.error("Đọc file không thành công")
            })

        }




    }

    useEffect(() => {
        GiaoVienService.getlist().then(res => {
            console.log(res.data)
            setlistgv(res.data)
            StudentService.getlist().then(ress => {
                setlistsession(ress.data)
                setlistst(ress.data)
                console.log(ress.data)
                setloadings(true)

            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
        })


    }, [])
    const changetext = (e) => {
        const objs = objfilter
        objs.condition = ''
        setobjfilter(objs)
        settext(e.target.value)
        let list = []
        if (date) {
            list = listst.filter(item => item.ngay == date)
        }
        else
            list = listst
        if (e.target.value)
            list = list.filter(item => (xoa_dau(item.code.toLowerCase())).includes(xoa_dau(e.target.value.toLowerCase())) == true || (xoa_dau(item.name.toLowerCase())).includes(xoa_dau(e.target.value.toLowerCase())) == true || (xoa_dau(item.course.toLowerCase())).includes(xoa_dau(e.target.value.toLowerCase())) == true)
        setlistsession(list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
        setDatas(list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))



    }

    const getlist = (e) => {
        setLists(e)


    }

    const save = () => {

        StudentService.getlist().then(ress => {

            setlistsession([...ress.data])
            setlistst(ress.data)


        }).catch(err => {
            console.log(err)
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

                                <div className='row mt-5 d-flex justify-content-between '>
                                    <div className="col col-md-7">
                                        <input type="text" className="form-control  ms-2 " id="teacher" onChange={(e) => changetext(e)} value={text} placeholder="Nhập nội dung tìm kiếm" />
                                    </div>
                                    {/* <CoHuu_Filter filter={filter} listst={listst} listgv={listgv} /> */}
                                    <div className="col col-md-5">
                                        <div className="row">
                                            <div className="col col-md-2">
                                                <Student_Add listgv={listgv} save={save} />
                                            </div>
                                            <div className="col col-md-10">
                                                <ImPort getdata={getdata} header={header} head={head} data={Data} row={2} name={"DanhSach_HocVien_" + new Date().getFullYear() + "_" + new Date().getMonth() + "_" + new Date().getDate()} />
                                            </div>
                                        </div>


                                    </div>


                                </div>
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>STT</th>
                                            <th scope="col">Mã học viên</th>
                                            <th scope="col">Tên học viên</th>

                                            <th scope="col">Khoá học</th>



                                            <th scope="col">Hạng</th>
                                            {/* <th scope="col">Quãng đường </th>
                                            <th scope="col">Thời gian </th>
                                            <th scope="col">Thời gian đêm</th> */}
                                            <th scope="col">Tên giáo viên</th>
                                            <th>Quản lý</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            lists && lists.map((item, index) => {
                                                return (
                                                    <tr className="alert " role="alert" key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>
                                                            {item.code}
                                                        </td>
                                                        <td>
                                                            {item.name}
                                                        </td>

                                                        <td>
                                                            {item.course
                                                            }
                                                        </td>


                                                        <td>
                                                            {item.rank}
                                                        </td>


                                                        {/* <td >
                                                            {item.distance ? item.distance + " Km" : ""}
                                                        </td>


                                                        <td>
                                                            {item.hours}
                                                        </td>
                                                        <td>
                                                            {item.nightTime}
                                                        </td> */}
                                                        <td>
                                                            {item.teacherId}
                                                        </td>
                                                        <td className="manage">
                                                            {/* <a href="#" className="close" data-dismiss="alert" aria-label="Close" onClick={() => xoa(item.cabinId)}>
                                                            <span aria-hidden="true"><i className="fa fa-close"></i></span>
                                                        </a> */}
                                                            <Student_Edit id={item.studentId} listst={listst} listgv={listgv} save={save} />
                                                        </td>

                                                    </tr>

                                                )
                                            })
                                        }








                                    </tbody>
                                </table>
                                <Paginations itemsPerPage={20} list={listsession} getlist={getlist} />
                            </> : <Loading />
                    }

                </div>
            </main >
        </>
    )
}
export default Student_List;