import React, { useState } from 'react'

function Sidebar() {
  const menuItems = [
    { name: 'Entry', icon: 'speedometer2' },
    { name: 'Parties', icon: 'table' },
    { name: 'Day Book', icon: 'grid' },
    { name: 'Report', icon: 'people-circle' },
  ];

  const [activeElement, setActiveElement] = useState();
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: '180px', height: '100vh' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <svg className="bi pe-none me-2" width="40" height="32" aria-hidden="true">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {
          menuItems.map((item, index) => (
            <li className="nav-item" onClick={() => setActiveElement(index)} key={index}>
              <a href="#" className={`nav-link  ${activeElement === index ? 'active' : 'link-body-emphasis'}`} onClick={() => handleItemClick(item)}>
                <svg className="bi pe-none me-2" width="16" height="16" aria-hidden="true">
                  <use xlinkHref={`#${item.icon}`}></use>
                </svg>
                {item.name}
              </a>
            </li>
          ))
        }
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
