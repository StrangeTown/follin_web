import React, { useState } from 'react'
import { PlusCircle, Target, CheckCircle, Circle, ChevronDown, ChevronUp } from 'lucide-react'
import useMilestoneStore from '../store/useMilestoneStore'

interface MilestoneListProps {
  onCreateMilestone: () => void
}

function MilestoneList({ onCreateMilestone }: MilestoneListProps) {
  const [showAll, setShowAll] = useState(false)
  const { milestones, toggleMilestoneCompletion, toggleMilestoneActive } = useMilestoneStore()

  const activeMilestones = milestones.filter(m => m.isActive)
  const displayedMilestones = showAll ? milestones : activeMilestones

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Milestones</h2>
        <button
          onClick={onCreateMilestone}
          className="p-1 rounded-full hover:bg-gray-100 text-blue-600"
          title="Add milestone"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </div>

      {displayedMilestones.length === 0 ? (
        <p className="text-gray-500 text-center py-2">
          {showAll ? "No milestones yet" : "No active milestones"}
        </p>
      ) : (
        <ul className="space-y-3">
          {displayedMilestones.map(milestone => (
            <li
              key={milestone.id}
              className={`p-3 rounded border-l-4 transition-all duration-300 ease-in-out ${
                milestone.isCompleted
                  ? 'border-green-500 bg-green-50'
                  : milestone.isActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="font-medium">{milestone.title}</h3>
                  <p className="text-sm text-gray-600">{milestone.longTermImpact}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleMilestoneActive(milestone.id)}
                    className={`p-1 rounded-full ${milestone.isActive ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    title={milestone.isActive ? "Mark as inactive" : "Mark as active"}
                  >
                    <Target className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleMilestoneCompletion(milestone.id)}
                    className={`p-1 rounded-full ${milestone.isCompleted ? 'text-green-600' : 'text-gray-400'
                      }`}
                    title={milestone.isCompleted ? "Mark as incomplete" : "Mark as complete"}
                  >
                    {milestone.isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {milestones.length > activeMilestones.length && (
        <div className="mt-3 text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            {showAll ? (
              <>
                <span>Show active only</span>
                <ChevronUp className="ml-1 w-4 h-4" />
              </>
            ) : (
              <>
                <span>Show all milestones</span>
                <ChevronDown className="ml-1 w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default MilestoneList