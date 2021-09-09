import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import building from '../components/images/building.jpg';

const DormList = () => {
  const { dormid } = useParams();
  const { buildingid } = useParams();

  const [dormList, setDormList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/building/${dormid}`)
      .then(res => {
        console.log(res.data);
        setDormList(res.data);
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='container'>
      <h1 className='mt-3 text-center'>
        อาคารทั้งหมด <i className='fas fa-building'></i>
      </h1>
      <div className='row'>
        {loading &&
          dormList.map(list => (
            <div
              className='col-sm-6 col-lg-4 col-xl-3 mt-3'
              key={list.BUILDINGID}
            >
              <div className='card col-lg-4' style={{ width: '18rem' }}>
                <img src={building} className='card-img-top' alt='buildings' />
                <div className='card-body'>
                  <h5 className='card-title text-center'>
                    <span className='fw-bold'>ชื่ออาคาร: </span>
                    {list.BUILDINGNAME}
                  </h5>
                </div>
                <div className='card-body mx-auto'>
                  <Link
                    to={`/all-room/${buildingid}`}
                    className='btn btn-lg'
                    style={{ backgroundColor: '#A4DBEA' }}
                  >
                    ข้อมูลห้องทั้งหมด
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DormList;
