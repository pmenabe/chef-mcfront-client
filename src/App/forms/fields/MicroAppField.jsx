import React, { useEffect, useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'

import api from '../../api'

function MicroAppField(props) {  
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const loading = open && options.length === 0

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    (async () => {
      const response = await api.getMicroApps()
      const options = await response.data

      if (active) {
        setOptions(options.map((option) => { return { value: option.id, name: option.name } }))
      }
    })()

    return () => {
      active = false
    };
  }, [loading])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  const handleChange = (event, data) => {
    let value = {}
    value.name = 'microAppId'
    value.value = data
    props.onChange(value)
  }
    
  return (
      <FormControl margin="normal" required fullWidth>
        <Autocomplete
          id="microAppField"
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          value={props.value ? { value: props.value.value, name: props.value.name ? props.value.name : props.value.label } : { name: '' }}
          getOptionSelected={(option, value) => option.value === value.value}
          getOptionLabel={(option) => option.name}
          options={options}
          loading={loading}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="MicroApp a construir"
              variant="outlined"
              margin="normal"
              name="microAppField"
              required
              fullWidth
              helperText="Seleccione la MicroApp que desea construir."
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </FormControl>
  )
}

export default MicroAppField