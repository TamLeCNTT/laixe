import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import range from "lodash-es/range";
import "./style.scss";
import { Modal } from "react-bootstrap";
import Header from "../../Layout/Header";
import CabinService from "../../Service/CabinService";
import Loading from "../../Layout/Loading";
import { connect } from "react-redux";
const weekDays = [
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
    "Chủ Nhật",
];

const todayObj = dayjs();

const Calendar = (props) => {
    const [dayObj, seliayObj] = useState(dayjs());
    const [listcabin, setListcabin] = useState([]);
    const [show, setshow] = useState(false);
    const [cellshow, setcellshow] = useState();
    const [Loadings, setloadings] = useState(false)

    useEffect(() => {
        // CabinService.getlist().then(res => {

        //     const date = new Date(res.data[0].ngay);

        //     console.log(date.getMonth());
        // })
        console.log(dayObj.month());
        CabinService.getBymonth(dayObj.month() + 1).then(res => {

            console.log(res.data)
            let datecurent = new Date().getDate()
            if (dayObj.month() > new Date().getMonth())
                datecurent = 1

            let listnew = res.data.filter(item => new Date(item.ngay).getDate() >= datecurent)

            setListcabin(listnew);
            setloadings(true)
        }).catch(e => {
            setloadings(false)
        });
    }, [dayObj, props.dataRedux.cabin]);

    const thisYear = dayObj.year();
    const thisMonth = dayObj.month(); // (January as 0, December as 11)
    const daysInMonth = dayObj.daysInMonth();

    const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`);
    const weekDayOf1 = dayObjOf1.day(); // (Sunday as 0, Saturday as 6)

    const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`);
    const weekDayOfLast = dayObjOfLast.day();

    const handlePrev = () => {
        seliayObj(dayObj.subtract(1, "month"));
        setloadings(false)
    };
    const checkday = (e) => {
        let newlist = listcabin.filter(item => new Date(item.ngay).getDate() == e)
        let sum = newlist.reduce((a, v) => (a = a + v.songuoi), 0)
        if (sum > 7)
            return true
        return false
    }
    const handleNext = () => {
        seliayObj(dayObj.add(1, "month"));
        setloadings(false)
        console.log(daysInMonth, weekDayOf1)
    };
    const nulls = (e) => {
        let list = [];
        for (let i = 0; i < 4 - e; i++) list.push(<tr className="cell nulls"></tr>);
        return list;
    };
    const have = (e) => {
        let list = [];
        for (let i = 0; i < e.songuoi; i++)
            list.push(
                <tr className="cell center font_size ">
                    <td>{e.giaovien}</td>
                </tr>
            );
        return list;
    };
    const cell = (e) => {
        let list = listcabin
            ? listcabin.filter((m) => new Date(m.ngay).getDate() == e)
            : [];

        let listMoring = list.filter((e) => e.buoi == 1);

        let listAfter = list.filter((e) => e.buoi == 2);
        let listTor = list.filter((e) => e.buoi == 3);
        let res = [];
        let test = ""

        if (list.length > 0)
            test = (
                <table className="table-bordered ">
                    <tr className="row-of-table">
                        <td className="font_size day-of-table">
                            Sáng <br></br> 7h-10h{" "}
                        </td>
                        <td className="teacher-of-table">
                            <table>
                                {listMoring.map((val, index) => {
                                    return <>{have(val)}</>;
                                })}
                                {nulls(listMoring.reduce((a, v) => (a = a + v.songuoi), 0))}
                            </table>
                        </td>
                    </tr>
                    <tr className="row-of-table">
                        <td className="font_size  day-of-table">
                            Trưa <br></br>10h30-13h30
                        </td>
                        <td className="teacher-of-table">
                            {" "}
                            <table>
                                {listAfter.map((val, index) => {
                                    return <>{have(val)}</>;
                                })}
                                {nulls(listAfter.reduce((a, v) => (a = a + v.songuoi), 0))}
                            </table>
                        </td>
                    </tr>
                    <tr className="row-of-table">
                        <td className="font_size day-of-table">
                            Chiều <br></br>14h-17h
                        </td>
                        <td className="teacher-of-table">
                            {" "}
                            <table className="bg-primary">
                                {listTor.map((val, index) => {
                                    return <>{have(val)}</>;
                                })}
                                {nulls(listTor.reduce((a, v) => (a = a + v.songuoi), 0))}
                            </table>
                        </td>
                    </tr>
                </table>
            );
        res.push(test);
        return res;
    };
    const openModal = (e) => {
        console.log(e);
        setcellshow(e);
        setshow(true);
    };
    return (
        <>
            <Header />
            <main id="calendar" className="main">
                <section id="about" className="about">
                    {

                        Loadings ? <div className="calendar">
                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col-lg-2">
                                    <button
                                        type="button"
                                        className="btn btn-lg btn-primary button-control back"
                                        onClick={handlePrev}
                                    >
                                        Tháng Trước
                                    </button>
                                </div>
                                <div className="col col-lg-4 col-sm-12 col-md-12">
                                    <div className="datetime">
                                        Ngày {dayObj.date()} Tháng {dayObj.month() + 1} Năm{" "}
                                        {dayObj.year()}{" "}
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <button
                                        type="button"
                                        className="btn btn-lg btn-primary button-control next"
                                        onClick={handleNext}
                                    >
                                        Tháng Sau
                                    </button>
                                </div>
                            </div>
                            <br></br>
                            <ul className="days weekdays ">
                                {weekDays.map((d) => (
                                    <>
                                        <li className=" week-cell font_size rows" key={d}>
                                            {d}
                                        </li>
                                    </>
                                ))}
                            </ul>

                            <ul className="days week-cell-mobile">
                                {range((weekDayOf1 == 0 ? 7 : weekDayOf1) - 1).map((i) => (
                                    <li className="  " key={i}>
                                        {/* {dayObjOf1.subtract(weekDayOf1 - i, "day").date()} */}
                                    </li>
                                ))}

                                {range(daysInMonth).map((i) => (
                                    <li className={`  week-cell `} key={i}>
                                        <span className="font_size day-pc">{i + 1}</span>
                                        {
                                            checkday(i + 1) ?
                                                <button
                                                    className="btn btn-danger day-mobile"
                                                    onClick={() => openModal(i + 1)}
                                                >
                                                    {i + 1}
                                                </button>
                                                :
                                                <button
                                                    className="btn btn-primary day-mobile"
                                                    onClick={() => openModal(i + 1)}
                                                >
                                                    {i + 1}
                                                </button>
                                        }


                                        {cell(i + 1)}


                                    </li>
                                ))}

                                {range(7 - weekDayOfLast).map((i) => (
                                    <li className="" key={i}>
                                        {/* {dayObjOfLast.add(i + 1, "day").date()} */}
                                    </li>
                                ))}
                            </ul>
                        </div> :
                            <Loading />

                    }


                    <Modal
                        show={show}
                        onHide={() => setshow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                <h3 className="text-center">Ngày {cellshow}</h3>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{cell(cellshow)}</Modal.Body>
                    </Modal>
                </section>
            </main>
        </>
    );
};
const mapStateToProps = (state) => {
    return { dataRedux: state };
};
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch({ type: "LOGOUT" }),
        addcart: (e) => dispatch({ type: "ADDCART", payload: e }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
