// Write your code here
// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {details} = props
  return (
    <div>
      <h1>Vaccination by gender</h1>
      <PieChart width={1000} height={300}>
        <Pie
          data={details}
          cx="50%"
          cy="60%"
          startAngle={180}
          endAngle={0}
          outerRadius="60%"
          innerRadius="30"
          dataKey="count"
        >
          <Cell name="Telugu" fill="#fecba6" />
          <Cell name="Hindi" fill="#b3d23f" />
          <Cell name="English" fill="#a44c9e" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
