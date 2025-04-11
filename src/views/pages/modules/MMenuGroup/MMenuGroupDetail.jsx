import React, { useEffect, useState, useMemo } from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol, CButton, CFormInput } from '@coreui/react'
import ApiService from '../../../../utils/axios'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilPen, cilTrash, cilXCircle } from '@coreui/icons'
import { Box, IconButton } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import fireNotif from '../../../../utils/fireNotif'
import { useSelector } from 'react-redux'

const MMenuGroupDetail = () => {
  const [menuGroup, setMenuGroup] = useState([])
  const [menuGroupDetail, setMenuGroupDetail] = useState([])
  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState('')
  const location = useLocation()
  const Navigate = useNavigate()
  const menuPrivilage = useSelector((state) => state.menuPrivilage)

  const onChangeRole = (idRole) => {
    setSelectedRole(idRole)
  }

  const TodoDeleteData = async (id) => {
    fireNotif.notifWarning('Delete this item?').then(async (swalRes) => {
      if (swalRes.isConfirmed) {
        const resAPi = await ApiService.deleteDataJWT('/mMenuGroupDetail', id)
        if (resAPi.data.success) {
          fireNotif.notifSuccess('Succesfully delete data').then((res) => {
            if (res.isConfirmed) {
              reloadData()
            }
          })
        }
      }
    })
  }
  const reloadData = async () => {
    const menuGroupId = location.state.id
    const res = await ApiService.getDataJWT('/mMenuGroup/' + menuGroupId)
    setMenuGroup(res.data.data)
    const resDetail = await ApiService.getDataJWT(
      `/mMenuGroupDetail?searchParam=id_m_menu_groups&searchValue=${menuGroupId}`,
    )
    setMenuGroupDetail(resDetail.data.data)
    const resRoles = await ApiService.getDataJWT('/mRole?searchParam=flag_active&searchValue=true')
    setRoles(resRoles.data.data)
    setSelectedRole(res.data.data.id_m_roles)
  }

  useEffect(() => {
    const TodoGetData = async () => {
      const menuGroupId = location.state.id
      const res = await ApiService.getDataJWT('/mMenuGroup/' + menuGroupId)
      setMenuGroup(res.data.data)
      const resDetail = await ApiService.getDataJWT(
        `/mMenuGroupDetail?searchParam=id_m_menu_groups&searchValue=${menuGroupId}`,
      )
      setMenuGroupDetail(resDetail.data.data)
      const resRoles = await ApiService.getDataJWT(
        '/mRole?searchParam=flag_active&searchValue=true',
      )
      setRoles(resRoles.data.data)
      setSelectedRole(res.data.data.id_m_roles)
    }
    TodoGetData()
  }, [location.state.id])

  const MemoTodo = useMemo(() => menuGroupDetail, [menuGroupDetail])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'menu.name', //simple recommended way to define a column
        header: 'Menu Name', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorFn: (row) =>
          row.flag_read ? (
            <CIcon icon={cilCheckCircle} className="text-success" />
          ) : (
            <CIcon icon={cilXCircle} className="text-danger" />
          ), //simple recommended way to define a column
        header: 'Can Read', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorFn: (row) =>
          row.flag_create ? (
            <CIcon icon={cilCheckCircle} className="text-success" />
          ) : (
            <CIcon icon={cilXCircle} className="text-danger" />
          ), //simple recommended way to define a column
        header: 'Can Create', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorFn: (row) =>
          row.flag_update ? (
            <CIcon icon={cilCheckCircle} className="text-success" />
          ) : (
            <CIcon icon={cilXCircle} className="text-danger" />
          ), //simple recommended way to define a column
        header: 'Can Update', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorFn: (row) =>
          row.flag_delete ? (
            <CIcon icon={cilCheckCircle} className="text-success" />
          ) : (
            <CIcon icon={cilXCircle} className="text-danger" />
          ), //simple recommended way to define a column
        header: 'Can Delete', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorFn: (row) =>
          row.flag_import ? (
            <CIcon icon={cilCheckCircle} className="text-success" />
          ) : (
            <CIcon icon={cilXCircle} className="text-danger" />
          ), //simple recommended way to define a column
        header: 'Can Import', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorFn: (row) =>
          row.flag_export ? (
            <CIcon icon={cilCheckCircle} className="text-success" />
          ) : (
            <CIcon icon={cilXCircle} className="text-danger" />
          ), //simple recommended way to define a column
        header: 'Can Export', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorFn: (row) =>
          row.flag_active ? (
            <CIcon icon={cilCheckCircle} className="text-success" />
          ) : (
            <CIcon icon={cilXCircle} className="text-danger" />
          ), //simple recommended way to define a column
        header: 'Active', //custom props
        enableHiding: false, //disable a feature for this column
      },
    ],
    [],
  )
  const tabel = useMaterialReactTable({
    columns,
    data: MemoTodo,
    enableRowActions: true,
    renderRowActions: ({ row }) => {
      const action =
        menuPrivilage.flag_update || menuPrivilage.flag_delete ? (
          <Box>
            {menuPrivilage.flag_update ? (
              <IconButton
                onClick={() =>
                  Navigate('/mastermenugroup/detail/update', {
                    state: { id: row.original.id, id_menu_group: menuGroup.id },
                  })
                }
              >
                <CIcon icon={cilPen} className="text-warning" size="lg" />
              </IconButton>
            ) : null}
            {menuPrivilage.flag_delete ? (
              <IconButton onClick={() => TodoDeleteData(row.original.id)}>
                <CIcon icon={cilTrash} className="text-danger" size="lg" />
              </IconButton>
            ) : null}
          </Box>
        ) : null

      return action
    },
  })

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Menu Group</CCardHeader>
        <CCardBody>
          {menuPrivilage.flag_update ? (
            <CRow>
              <CCol style={{ display: 'flex', justifyContent: 'end' }}>
                <CButton
                  onClick={() => {
                    Navigate('/mastermenugroup/update', { state: { id: menuGroup.id } })
                  }}
                  color="warning"
                >
                  Update
                </CButton>
              </CCol>
            </CRow>
          ) : null}
          <CRow className="mb-3">
            <CCol xs={4}>
              <CFormInput
                className="mb-3"
                label="Group Name"
                value={menuGroup.name}
                onChange={(val) => onChangeRole(val.target.value)}
                disabled={true}
              />
            </CCol>
            <CCol xs={4}>
              <CFormInput
                className="mb-3"
                label="Role"
                value={menuGroup.role?.name}
                disabled={true}
              />
            </CCol>
            <CCol xs={4}>
              <CFormInput
                className="mb-3"
                label="Active"
                value={menuGroup.flag_active}
                disabled={true}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Group Details</CCardHeader>
        <CCardBody>
          {menuPrivilage.flag_create ? (
            <CRow>
              <CCol style={{ display: 'flex', justifyContent: 'end' }} className="mb-3">
                <CButton
                  onClick={() => {
                    Navigate('/mastermenugroup/detail/create', {
                      state: { id_menu_group: menuGroup.id },
                    })
                  }}
                  color="primary"
                >
                  Add
                </CButton>
              </CCol>
            </CRow>
          ) : null}
          <CRow>
            <CCol>
              <MaterialReactTable table={tabel} />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default MMenuGroupDetail
