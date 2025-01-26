import { AllAgentConfigsType } from '@/app/types';
import customerServiceRetail from './customerServiceRetail';
import simpleExample from './simpleExample';

export const allAgentSets: AllAgentConfigsType = {
  customerServiceRetail,
  simpleExample,
};

export const defaultAgentSetKey = 'simpleExample';
