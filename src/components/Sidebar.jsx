import React, { useState } from 'react'
import { FaFileSignature } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { MdOutlineBook } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";

function Sidebar() {
  const menuItems = [
    {
      name: "Entry",
      icon: FaFileSignature,
    },
    {
      name: "Parties",
      icon: FaUsers,
    },
    {
      name: "Day Book",
      icon: MdOutlineBook,
    },
    {
      name: "Report",
      icon: HiOutlineDocumentReport,
    },
  ];

  const [activeElement, setActiveElement] = useState();
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: '12%', height: '100vh' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <svg className="bi pe-none me-2" width="25" height="32" aria-hidden="true">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <li
              className="nav-item"
              key={index}
              onClick={() => setActiveElement(index)}
            >
              <a
                href="#"
                className={`nav-link ${activeElement === index
                    ? "active"
                    : "link-body-emphasis"
                  }`}
                  style={{fontSize:'0.8rem'}}
              >
                <Icon
                  size={25}
                  style={{ marginRight: "10px" }}
                />

                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
      <hr />
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu text-small shadow">
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
