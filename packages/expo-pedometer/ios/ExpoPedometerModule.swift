import ExpoModulesCore
import CoreMotion

public class ExpoPedometerModule: Module {
    
    let kOnStepCounted = "onStepCounted"

    public func definition() -> ModuleDefinition {
        var pedometer: CMPedometer? = nil

        Name("ExpoPedometer")
        
        Events(kOnStepCounted)

        Function("requestPermissions") {
            pedometer = CMPedometer()
            pedometer?.stopEventUpdates()
        }
        
        Function("startSendingData") {
            pedometer = CMPedometer()
            pedometer?.startUpdates(from: Date()) { pedometerData, error in
            guard let pedometerData = pedometerData, error == nil else { return }
                self.sendEvent(self.kOnStepCounted, [
                   "step": pedometerData.numberOfSteps.intValue
                ])
            }
        }
      
       Function("stopSendingData") {
           pedometer?.stopEventUpdates()
           pedometer = nil
       }
    }
}