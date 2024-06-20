import { Checkbox, CheckboxGroup, Stack} from '@chakra-ui/react'
import React from 'react'

function IndeterminateExample() {
    const [checkedItems, setCheckedItems] = React.useState([false, false])
  
    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked
  
    return (
        
      <>
        <Stack pl={0} mt={1} spacing={1}>
        Segunda
            <Checkbox
          isChecked={allChecked}
          
          onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
        >
          
        </Checkbox>
          <Checkbox
            isChecked={checkedItems[0]}
            onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
          >
            
          </Checkbox>
          <Checkbox
            isChecked={checkedItems[1]}
            onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
          >
            
          </Checkbox>
        </Stack>
      </>
    )
  }

  export default IndeterminateExample;